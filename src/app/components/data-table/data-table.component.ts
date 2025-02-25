import { Component, HostListener, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
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
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogboxaddComponent } from '../../dialogbox/dialogboxadd/dialogboxadd.component';
import { DialogboxgetComponent } from '../../dialogbox/dialogboxget/dialogboxget.component';
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [MatIconModule,CommonModule,MatButtonModule, MatTableModule, MatPaginatorModule, FormsModule],
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
    isAddDialogOpen = false; // ✅ Flag for first dialog
    isGetDialogOpen = false; // ✅ Flag for second dialog
    addDialogRef!: MatDialogRef<any> | null;
    getDialogRef!: MatDialogRef<any> | null;

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

  @HostListener('click', ['$event'])
  stopPropagation(event: Event) {
  console.log('Click event inside parent element'); // ✅ Debug log
  event.stopPropagation();
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

  editableState : any = {};
  originalValues : any = {};

  editCell(element: any, column: string) {
    const key = `${element.student_id}-${column}`;
    console.log(element._id);
    
    this.editableState[key] = true;
    
    if (!this.originalValues[key]) {
      this.originalValues[key] = element[column];
    }
  }

  saveCell(element: any, column: string) {
    const key = `${element.student_id}-${column}`;
    this.editableState[key] = false;

    const originalValue = this.originalValues[key];
  
    const newValue = element[column];

    if (originalValue !== newValue) {
      console.log(`Changed ${column} from ${originalValue} to ${newValue}`);
    }
    console.log(newValue, originalValue);
    
    delete this.originalValues[key];

  }

  isEditing(element: any, column: string): boolean {
    const key = `${element.student_id}-${column}`;
    return !!this.editableState[key];
  }

  
}

