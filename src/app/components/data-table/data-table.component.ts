import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { User } from '../../models/user.model';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { loadUsers, setPagination } from '../../state/user.actions';
import { selectPaginatedUsers, selectUserPagination } from '../../state/user.selectors';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule],
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['ID', 'Name', 'Email'];
  dataSource = new MatTableDataSource<User>([]);

  users$: Observable<User[]>;
  pagination$: Observable<{ length: number; pageSize: number; pageIndex: number }>;

  length: number = 0;
  pageSize: number = 5;
  pageIndex: number = 0;
  pageSizeOptions: number[] = [5, 10, 25];

  worker!: Worker
  subscriptions: Subscription[] = [];

  hidePageSize = false;
    showPageSizeOptions = true;
    showFirstLastButtons = true;
    disabled = false;

  constructor(private store: Store) {
    this.users$ = this.store.select(selectPaginatedUsers);
    this.pagination$ = this.store.select(selectUserPagination);
  }

  ngOnInit(): void {
    this.store.dispatch(loadUsers());

    if (typeof Worker !== 'undefined') {
      this.worker = new Worker(new URL('../../webworkers/tableloader.worker', import.meta.url))
      this.worker.onmessage = ({ data }) => {
        this.dataSource.data = data.paginatedUsers;
      };
    }
    this.subscriptions.push(
      this.pagination$.subscribe(({length, pageSize, pageIndex})=>{
        this.length = length;
        this.pageSize = pageSize;
        this.pageIndex = pageIndex;
        this.updatePaginatedUsers();
      })
    )
  }

  updatePaginatedUsers(){
    if (this.worker) {
      this.users$.subscribe(users=>{
        this.worker.postMessage({users})
      })
    }
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
}

