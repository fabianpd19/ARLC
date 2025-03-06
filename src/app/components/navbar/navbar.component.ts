import {Component} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatDialog } from '@angular/material/dialog';
import { AuthComponent } from '../auth/auth.component';


@Component({
  selector: 'app-navbar',
  imports: [MatToolbarModule, MatIconModule, MatButtonModule ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private dialog: MatDialog) {}

  openAuthDialog(mode: 'login' | 'register'): void {
    this.dialog.open(AuthComponent, {
      width: '400px',
      data: { mode }
    });
  }
}
