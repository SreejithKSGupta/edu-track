import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { User } from '../../models/user.model';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { loadMoreUsers, loadMoreUsersSuccess, loadUsers, setPagination } from '../../state/user.actions';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import { selectAllUsers, selectUserPagination } from '../../state/user.selectors';
import { MatDialog } from '@angular/material/dialog';
import { DialogboxaddComponent } from '../../dialogbox/dialogboxadd/dialogboxadd.component';
import { DialogboxgetComponent } from '../../dialogbox/dialogboxget/dialogboxget.component';
@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule],
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

  worker!: Worker
  subscriptions: Subscription[] = [];

  hidePageSize = false;
    showPageSizeOptions = true;
    showFirstLastButtons = true;
    disabled = false;

  constructor(private store: Store,  public dialog: MatDialog) {
    this.users$ = this.store.select(selectAllUsers);
    this.pagination$ = this.store.select(selectUserPagination);
  }

  ngOnInit(): void {
    this.store.dispatch(loadUsers());

    if (typeof Worker !== 'undefined') {
      if(!this.worker){

        this.worker = new Worker(new URL('../../webworkers/tableloader.worker', import.meta.url))
        this.worker.onmessage = ({ data }) => {
          this.store.dispatch(loadMoreUsers({ users: data.remainingUsers }));
        };
      }
    }
    this.subscriptions.push(
      this.pagination$.subscribe(({length, pageSize, pageIndex})=>{
        this.length = length;
        this.pageSize = pageSize;
        this.pageIndex = pageIndex;
        this.updatePaginatedUsers();
      })
    )
    setTimeout(() => {
      this.users$.subscribe(users => {
        if (users.length > 10 && this.worker) {
          this.worker.postMessage({ users: users.slice(100) });
        }
      });
    }, 2000);
  }

  updatePaginatedUsers() {
    this.users$.subscribe(users => {
      const startIndex = this.pageIndex * this.pageSize;
      this.dataSource.data = users.slice(startIndex, startIndex + this.pageSize);
    });
  }

  handlePageEvent(event: PageEvent) {
    this.store.dispatch(setPagination({ pageIndex: event.pageIndex, pageSize: event.pageSize }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    if (this.worker) {
      this.worker.terminate(); 
    }
  }

  openaddDialog() {
    this.dialog.open(DialogboxaddComponent, {
      position: { left: '10vw', top: '10vh' },
      width: '50vw',
      height: '100vw',
      disableClose: true,
      hasBackdrop: false 
    });
  }

  opengetDialog() {
    this.dialog.open(DialogboxgetComponent, {
      position: { left: '55vw', top: '10vh' },
      width: '50vw',
      height: '70vw',
      disableClose: true,
      hasBackdrop: false
    });
  }
}

