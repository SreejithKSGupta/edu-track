import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../models/user.model';
import { DataService } from '../../services/data.service';

import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss'
})
export class DataTableComponent implements OnInit {
  users: User[] = [];

  displayedColumns: string[]=['ID', 'Name', 'Email'];
  dataSource = new MatTableDataSource<User>(this.users);

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getUsers().subscribe((data) =>{ 
      this.users = data
      this.length = data.length
      this.dataSource.data = this.users.slice(this.startIndex, this.pageSize);
  });
  }
  shownlist:any;
  
    length:number = 0;
    pageSize:number = 5;
    startIndex:number=0;
    endindex:number=0;
    pageIndex:number = 0;
    pageSizeOptions:number[] = [5, 10, 25];
  
    hidePageSize = false;
    showPageSizeOptions = true;
    showFirstLastButtons = true;
    disabled = false;
  
    pageEvent!: PageEvent;
  
    handlePageEvent(e: PageEvent) {
      this.pageEvent = e;
      this.length = e.length;
      this.startIndex=e.pageIndex*e.pageSize;
      this.endindex=e.pageIndex*e.pageSize+e.pageSize;
      this.pageSize = e.pageSize;
      this.pageIndex = e.pageIndex;
      this.dataSource.data = this.users.slice(this.startIndex, this.endindex);
      
    }
  
    setPageSizeOptions(setPageSizeOptionsInput: string) {
      if (setPageSizeOptionsInput) {
        this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
      }
    }

}

