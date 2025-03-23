import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../../guard/auth.guard';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loadingcomponent',
  imports: [NgIf,CommonModule],
  templateUrl: './loadingcomponent.component.html',
  styleUrl: './loadingcomponent.component.scss'
})
export class LoadingcomponentComponent  implements OnInit {
  constructor(public authGuard: AuthGuard) {}

  ngOnInit() {
    console.log("loading");
  }
}

