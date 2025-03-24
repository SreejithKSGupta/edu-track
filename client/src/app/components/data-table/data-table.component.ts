import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable, Subscription, take } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { User } from '../../models/user.model';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import {
  commitPrefetchedUsers,
  loadMoreUsers,
  setPagination,
  updateUserData
} from '../../state/user.actions';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { selectAllUsers, selectUserPagination } from '../../state/user.selectors';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { NotificationService } from '../../services/notification.service';
import { CookieService } from 'ngx-cookie-service';
import CryptoJS from 'crypto-js';
import { DialogboxrowComponent } from "../dialogboxrow/dialogboxrow.component";
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';

enum StudentColumnKey {
  ID = 'ID',
  Name = 'Name',
  Email = 'Email',
  Phone = 'Phone',
  Gender = 'Gender',
}

interface CellEditState {
  [key: string]: boolean;
}

interface OriginalValues {
  [key: string]: string;
}

interface PaginationState {
  length: number;
  pageSize: number;
  pageIndex: number;
}

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    MatTooltipModule,
    DialogboxrowComponent,
    MatButtonModule,
    TranslateModule
  ],
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements OnInit, OnDestroy {
  // Constants
  private readonly SECRET_KEY = 'your-secret-key';
  private readonly INITIAL_PAGE_SIZE = 10;
  private readonly PREFETCH_LIMIT = 1000;

  // Column and table configuration
  readonly displayedColumns: string[] = Object.values(StudentColumnKey);
  readonly pageSizeOptions: number[] = [10, 25, 50];
  readonly hidePageSize = false;
  readonly showPageSizeOptions = true;
  readonly showFirstLastButtons = true;
  readonly columnKeys = StudentColumnKey;

  // Data source and state
  dataSource = new MatTableDataSource<User>([]);
  users$: Observable<User[]>;
  pagination$: Observable<PaginationState>;
  editableState: CellEditState = {};
  originalValues: OriginalValues = {};

  // Pagination state
  length = 0;
  pageSize = this.INITIAL_PAGE_SIZE;
  pageIndex = 0;
  disabled = false;

  // Worker and prefetch state
  private worker?: Worker;
  private subscriptions: Subscription[] = [];
  private prefetchedUsers: User[] = [];
  private userId = '';

  constructor(
    private store: Store,
    private dataService: DataService,
    private notificationService: NotificationService,
    private cookieService: CookieService
  ) {
    this.users$ = this.store.select(selectAllUsers);
    this.pagination$ = this.store.select(selectUserPagination);
    this.initializeUserId();
  }

  ngOnInit(): void {
    this.loadInitialData();
    this.setupSubscriptions();
    this.initWorker();
    this.prefetchNextChunk();
  }

  ngOnDestroy(): void {
    this.cleanupResources();
  }

  handlePageEvent(event: PageEvent): void {
    this.store.dispatch(setPagination({
      pageIndex: event.pageIndex,
      pageSize: event.pageSize
    }));

    this.checkAndCommitPrefetchedUsers(event.pageIndex);
  }

  editCell(element: User, column: string): void {
    const key = this.getCellKey(element, column);

    // Close any other open editors
    this.closeAllEditors();

    // Open this editor
    this.editableState[key] = true;

    // Save original value for comparison
    if (!this.originalValues[key] && element[column as keyof User]) {
      this.originalValues[key] = element[column as keyof User] as string;
    }

    // Trigger change detection
    this.refreshDataSource(element._id);
  }

  saveCell(element: User, column: string): void {
    const key = this.getCellKey(element, column);
    const newValue = element[column as keyof User] as string;

    // Close editor
    this.editableState[key] = false;

    // Update local data
    this.updateLocalData(element, column);

    // Only update server if value changed and user is authenticated
    if (this.shouldUpdateServer(key, newValue)) {
      this.updateServerData(element, column, newValue, key);
    }

    // Cleanup
    delete this.originalValues[key];
  }

  isEditing(element: User, column: string): boolean {
    const key = this.getCellKey(element, column);
    return this.editableState[key] ?? false;
  }

  // Private methods
  private initializeUserId(): void {
    const encryptedUserId = this.cookieService.get('user_id');
    if (encryptedUserId) {
      this.userId = CryptoJS.AES.decrypt(encryptedUserId, this.SECRET_KEY)
        .toString(CryptoJS.enc.Utf8);
    }
  }

  private loadInitialData(): void {
    this.store.dispatch(loadMoreUsers({ offset: 0, limit: this.PREFETCH_LIMIT }));
  }

  private setupSubscriptions(): void {
    // Subscribe to users with pagination
    this.subscriptions.push(
      this.users$.pipe(
        map(users => this.getPaginatedUsers(users))
      ).subscribe(pagedUsers => {
        this.dataSource.data = pagedUsers;
      })
    );

    // Subscribe to pagination changes
    this.subscriptions.push(
      this.pagination$.subscribe(pagination => {
        this.length = pagination.length;
        this.pageSize = pagination.pageSize;
        this.pageIndex = pagination.pageIndex;
        this.updatePaginatedUsers();
      })
    );
  }

  private initWorker(): void {
    if (typeof Worker === 'undefined') return;

    this.worker = new Worker(
      new URL('../../webworkers/tableloader.worker', import.meta.url)
    );

    this.worker.onmessage = ({ data }) => {
      const fetchedUsers: User[] = data.users;
      if (fetchedUsers?.length > 0) {
        this.prefetchedUsers = fetchedUsers;
      }
    };
  }

  private prefetchNextChunk(): void {
    if (!this.worker) return;

    this.worker.postMessage({
      offset: this.length,
      limit: this.length + this.PREFETCH_LIMIT
    });
  }

  private updatePaginatedUsers(): void {
    this.users$.pipe(
      take(1),
      map(users => this.getPaginatedUsers(users))
    ).subscribe(pagedUsers => {
      this.dataSource.data = pagedUsers;
    });
  }

  private getPaginatedUsers(users: User[]): User[] {
    const startIndex = this.pageIndex * this.pageSize;
    return users.slice(startIndex, startIndex + this.pageSize);
  }

  private checkAndCommitPrefetchedUsers(pageIndex: number): void {
    const totalVisiblePages = Math.ceil(this.length / this.pageSize);

    if (pageIndex === totalVisiblePages - 1 && this.prefetchedUsers.length > 0) {
      this.store.dispatch(commitPrefetchedUsers({
        users: this.prefetchedUsers
      }));

      this.prefetchedUsers = [];
      this.prefetchNextChunk();
    }
  }

  private cleanupResources(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());

    if (this.worker) {
      this.worker.terminate();
      this.worker = undefined;
    }
  }

  private getCellKey(element: User, column: string): string {
    return `${element._id}-${column}`;
  }

  private closeAllEditors(): void {
    Object.keys(this.editableState).forEach(key => {
      this.editableState[key] = false;
    });
  }

  private refreshDataSource(elementId: string): void {
    this.dataSource.data = this.dataSource.data.map(item =>
      item._id === elementId ? { ...item } : item
    );
  }

  private updateLocalData(element: User, column: string): void {
    const index = this.dataSource.data.findIndex(item => item._id === element._id);

    if (index !== -1) {
      const updatedElement = {
        ...this.dataSource.data[index],
        [column]: element[column as keyof User]
      };

      const updatedData = [...this.dataSource.data];
      updatedData[index] = updatedElement;
      this.dataSource.data = updatedData;
    }
  }

  private shouldUpdateServer(key: string, newValue: string): boolean {
    return this.originalValues[key] !== newValue &&
           this.userId !== '' &&
           this.userId !== undefined;
  }

  private updateServerData(element: User, column: string, newValue: string, key: string): void {
    const updatedData = { [column]: newValue };

    this.dataService.updateStudentById(element._id, updatedData)
      .pipe(
        tap(() => this.store.dispatch(updateUserData({
          id: element._id,
          changes: updatedData
        }))),
        switchMap(() => {
          const notification = {
            title: `Details modified for ${key}`,
            message: `${this.originalValues[key]} edited to ${newValue} for ${key}`,
            read: [this.userId],
          };
          return this.notificationService.sendnotification(notification);
        })
      )
      .subscribe();
  }
}
