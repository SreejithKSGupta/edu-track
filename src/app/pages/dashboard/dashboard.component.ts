import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { MatCard,MatCardActions,MatCardContent,MatCardHeader,MatCardTitle,MatCardSubtitle,MatCardFooter } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {  Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  imports: [NgFor,MatCard,MatCardHeader,MatCardTitle,MatIconModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  constructor(private router:Router) { }
  ngOnInit(): void {}

  adminpages=[
    {
      title:'Student Management',
      icon: 'account_circle',
      link:'/student'
    },
    {
      title:'Teacher Management',
      icon: 'work',
      link:'/teacher'
      },
    {
      title:'Course Management',
      icon: 'library_books',
      link:'/course'
      },
    {
      title:'Department Management',
      icon: 'school',
      link:'/department'
    },
  ]

openitem(link:string){
   this.router.navigate([`/${link}`]);
}

}
