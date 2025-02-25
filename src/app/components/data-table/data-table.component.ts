import { Component, HostListener, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { User } from '../../models/user.model';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { commitPrefetchedUsers, loadMoreUsers, setPagination } from '../../state/user.actions';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { selectAllUsers, selectUserPagination } from '../../state/user.selectors';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogboxaddComponent } from '../../dialogbox/dialogboxadd/dialogboxadd.component';
import { DialogboxgetComponent } from '../../dialogbox/dialogboxget/dialogboxget.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [MatIconModule, CommonModule, MatButtonModule, MatTableModule, MatPaginatorModule, FormsModule],
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DataTableComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['ID', 'Name', 'Email', 'Phone', 'Gender'];
  dataSource = new MatTableDataSource<User>([]);

  users$: Observable<User[]>;
  pagination$: Observable<{ length: number; pageSize: number; pageIndex: number }>;

  length: number = 0;
  pageSize: number = 10;
  pageIndex: number = 0;
  pageSizeOptions: number[] = [10, 25, 50];
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  isAddDialogOpen = false; // ✅ Flag for first dialog
  isGetDialogOpen = false; // ✅ Flag for second dialog
  addDialogRef!: MatDialogRef<any> | null;
  getDialogRef!: MatDialogRef<any> | null;

  worker!: Worker
  subscriptions: Subscription[] = [];
  currentOffset: number = 100;
  prefetchedUsers: User[] = [];


  constructor(private store: Store, public dialog: MatDialog, private dataService: DataService) {
    this.users$ = this.store.select(selectAllUsers);
    this.pagination$ = this.store.select(selectUserPagination);
  }

  ngOnInit(): void {
    this.store.dispatch(loadMoreUsers({ offset: 0, limit: 1000 }));
    this.subscriptions.push(
      this.users$.subscribe(users => {
        const startIndex = this.pageIndex * this.pageSize;
        this.dataSource.data = users.slice(startIndex, startIndex + this.pageSize);
      })
    );
    this.subscriptions.push(
      this.pagination$.subscribe(({ length, pageSize, pageIndex }) => {
        this.length = length;
        this.pageSize = pageSize;
        this.pageIndex = pageIndex;
        this.updatePaginatedUsers();
      })
    )
    this.initWorker();
    this.prefetchNextChunk();
  }

  @HostListener('click', ['$event'])
  stopPropagation(event: Event) {
    console.log('Click event inside Parent Component!');
    event.stopPropagation();
  }

  initWorker() {

    if (typeof Worker !== 'undefined') {
      if (!this.worker) {

        this.worker = new Worker(new URL('../../webworkers/tableloader.worker', import.meta.url))
        this.worker.onmessage = ({ data }) => {
          const fetchedUsers: User[] = data.users;
          if (fetchedUsers && fetchedUsers.length > 0) {
            this.prefetchedUsers = fetchedUsers;
          }
        };
      }
    }
  }

  prefetchNextChunk() {
    if (this.worker) {
      console.log("prefetch");

      this.worker.postMessage({ offset: this.length, limit: this.length + 1000 });
    }
  }

  updatePaginatedUsers() {
    this.users$.subscribe(users => {
      const startIndex = this.pageIndex * this.pageSize;
      this.dataSource.data = users.slice(startIndex, startIndex + this.pageSize);
    });
  }

  handlePageEvent(event: PageEvent) {
    this.store.dispatch(setPagination({ pageIndex: event.pageIndex, pageSize: event.pageSize }));
    const totalVisiblePages = Math.ceil(this.length / this.pageSize);
    if (event.pageIndex === totalVisiblePages - 1 && this.prefetchedUsers.length > 0) {
      this.store.dispatch(commitPrefetchedUsers({ users: this.prefetchedUsers }));
      this.prefetchedUsers = [];
      this.prefetchNextChunk();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    if (this.worker) {
      this.worker.terminate();
    }
  }

  openAddDialog(event: Event) {
    event.stopPropagation();  // ✅ Stops event from bubbling up
    console.log("Dialogboxadd is opened");
    if (!this.isAddDialogOpen) {
      this.isAddDialogOpen = true;
      this.addDialogRef = this.dialog.open(DialogboxaddComponent, {
        position: { left: '5vw', top: '22vh' },
        width: '40vw',
        disableClose: true,
        hasBackdrop: false
      });

      this.addDialogRef.afterClosed().subscribe(() => {
        this.isAddDialogOpen = false;
        this.addDialogRef = null;
      });
    } else {
      this.closeAddDialog();
    }
  }

  openGetDialog(event: Event) {
    event.stopPropagation();  // ✅ Stops event from bubbling up
    console.log("Dialogboxget is opened");
    if (!this.isGetDialogOpen) {
      this.isGetDialogOpen = true;
      this.getDialogRef = this.dialog.open(DialogboxgetComponent, {
        position: { left: '45vw', top: '25vh' },
        width: '40vw',
        disableClose: true,
        hasBackdrop: false
      });

      this.getDialogRef.afterClosed().subscribe(() => {
        this.isGetDialogOpen = false;
        this.getDialogRef = null;
      });
    } else {
      this.closeGetDialog();
    }
  }

  closeAddDialog() {
    if (this.isAddDialogOpen && this.addDialogRef) {
      this.addDialogRef.close();
      this.isAddDialogOpen = false; // ✅ Reset flag
      this.addDialogRef = null;
    }
  }

  closeGetDialog() {
    if (this.isGetDialogOpen && this.getDialogRef) {
      this.getDialogRef.close();
      this.isGetDialogOpen = false; // ✅ Reset flag
      this.getDialogRef = null;
    }
  }

  closeAllDialogs() {
    this.closeAddDialog();
    this.closeGetDialog();
  }

  editableState: any = {};
  originalValues: any = {};

  editCell(element: any, column: string) {
    const key = `${element._id}-${column}`;

    this.editableState[key] = true;

    if (!this.originalValues[key]) {
      this.originalValues[key] = element[column];
    }

    this.dataSource.data = this.dataSource.data.map((item: any) =>
      item._id === element._id ? { ...item } : item
    );

  }

  saveCell(element: any, column: string) {
    const key = `${element._id}-${column}`;
    const newValue = element[column];
    const index = this.dataSource.data.findIndex(item => item._id === element._id);
    if (index !== -1) {
      const updatedElement = { ...this.dataSource.data[index], [column]: newValue };
      const updatedData = [...this.dataSource.data];
      updatedData[index] = updatedElement;
      this.dataSource.data = updatedData;
    }
    this.editableState[key] = false;

    // console.log("Edited data: " + newValue);
    // console.log("Edited data id: " + element._id);
    // console.log("Edited data field: " + column);
    const updatedData = { [column]: newValue };

    this.dataService.updateStudentById(element._id, updatedData).subscribe(res => {
      alert("Updated...")
    })

    delete this.originalValues[key];

  }

  isEditing(element: any, column: string): boolean {
    const key = `${element._id}-${column}`;
    return !!this.editableState[key];
  }


}

