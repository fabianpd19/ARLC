import {Component, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatDialog } from '@angular/material/dialog';
import { AuthComponent } from '../auth/auth.component';
import { NgForm } from '@angular/forms';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-navbar',
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  userEmail: string | null = null;
  constructor(private dialog: MatDialog) {}
  ngOnInit(): void {
    // Recuperar el correo electrónico del localStorage
    this.userEmail = localStorage.getItem('userEmail');
  }

  // Método para cerrar sesión (opcional)
  logout(): void {
    localStorage.removeItem('userEmail');
    window.location.reload(); // Refrescar la página al cerrar sesión
  }

  openAuthDialog(mode: 'login' | 'register'): void {
    this.dialog.open(AuthComponent, {
      width: '400px',
      data: { mode }
    });
  }
}
