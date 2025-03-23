import { Component, HostListener } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogboxaddComponent } from '../dialogbox/dialogboxadd/dialogboxadd.component';
import { DialogboxgetComponent } from '../dialogbox/dialogboxget/dialogboxget.component';
import { DataService } from '../../services/data.service';
import { NotificationService } from '../../services/notification.service';
import { CookieService } from 'ngx-cookie-service';
import { MatIcon } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { tap } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dialogboxrow',
  imports: [MatIcon, NgIf, MatButtonModule],
  templateUrl: './dialogboxrow.component.html',
  styleUrl: './dialogboxrow.component.scss'
})
export class DialogboxrowComponent {
  disabled = false;
  isAddDialogOpen = false;
  isGetDialogOpen = false;
  addDialogRef!: MatDialogRef<unknown> | null;
  getDialogRef!: MatDialogRef<unknown> | null;



  constructor(private store: Store, public dialog: MatDialog, private dataService: DataService, private notficationservice: NotificationService, private cookie: CookieService) { }

  @HostListener('click', ['$event'])
  stopPropagation(event: Event) {
    event.stopPropagation();
    this.closeAllDialogs(event);
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.target === document.body || event.target === document.documentElement || event.key === 'Escape') {
      this.closeAllDialogs(event);
    }
  }

  @HostListener('document:click', ['$event'])
  handleClickEvent(event: MouseEvent): void {
    if (event.target === document.body || event.target === document.documentElement) {
      this.closeAllDialogs(event);
    }
  }

  openAddDialog(event: Event): void {
    event.stopPropagation();
    console.log("Dialogboxadd is opened");
    if (!this.isAddDialogOpen) {
      this.isAddDialogOpen = true;
      this.addDialogRef = this.dialog.open(DialogboxaddComponent, {
        disableClose: true,
        hasBackdrop: false
      });

      this.addDialogRef.afterClosed().pipe(
        tap(() => {
          this.isAddDialogOpen = false;
          this.addDialogRef = null;
        })
      ).subscribe();
    } else {
      this.closeAddDialog();
    }
  }

  openGetDialog(event: Event): void {
    event.stopPropagation();
    console.log("Dialogboxget is opened");
    if (!this.isGetDialogOpen) {
      this.isGetDialogOpen = true;
      this.getDialogRef = this.dialog.open(DialogboxgetComponent, {
        disableClose: true,
        hasBackdrop: false
      });

      this.getDialogRef.afterClosed().pipe(
        tap(() => {
          this.isGetDialogOpen = false;
          this.getDialogRef = null;
        })
      ).subscribe();
    } else {
      this.closeGetDialog();
    }
  }

  closeAddDialog(): void {
    if (this.isAddDialogOpen && this.addDialogRef) {
      this.addDialogRef.close();
      this.isAddDialogOpen = false;
      this.addDialogRef = null;
    }
  }

  closeGetDialog(): void {
    if (this.isGetDialogOpen && this.getDialogRef) {
      this.getDialogRef.close();
      this.isGetDialogOpen = false;
      this.getDialogRef = null;
    }
  }

  closeAllDialogs(event: Event): void {
    event.stopPropagation();
    this.closeAddDialog();
    this.closeGetDialog();
  }


}