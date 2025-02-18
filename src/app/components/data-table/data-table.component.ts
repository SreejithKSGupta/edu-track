import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../models/user.model';
import { DataService } from '../../services/data.service';

import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
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
      // this.users = data
      this.dataSource.data = data
  });
  }
}

