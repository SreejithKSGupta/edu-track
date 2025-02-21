import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './services/theme.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogboxaddComponent } from './dialogbox/dialogboxadd/dialogboxadd.component';
import { DialogboxgetComponent } from './dialogbox/dialogboxget/dialogboxget.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'edu-track';
  constructor(public themeService: ThemeService, public dialog: MatDialog) {}


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
        height: '80vw',
        disableClose: true,
        hasBackdrop: false
      });
    }
}

// if (typeof Worker !== 'undefined') {
//   // Create a new
//   const worker = new Worker(new URL('./webworkers/tableloader.worker', import.meta.url));
//   worker.onmessage = ({ data }) => {
//     console.log(`page got message: ${data}`);
//   };
//   worker.postMessage('hello');
// } else {
//   // Web Workers are not supported in this environment.
//   // You should add a fallback so that your program still executes correctly.
// }