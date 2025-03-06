import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isLoginMode = true;
  isStep1Complete = false;
  errorMessage = '';
  successMessage = '';

  // Login form
  loginData = {
    email: '',
    password: ''
  };

  // Registro form - Parte 1
  registrationStep1 = {
    email: '',
    password: '',
    confirmPassword: ''
  };

  // Registro form - Parte 2
  registrationStep2 = {
    email: '',
    fullName: '',
    gender: '',
    phoneNumber: '',
    birthDate: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.isStep1Complete = false;
    this.errorMessage = '';
    this.successMessage = '';
  }

  onLogin() {
    if (!this.loginData.email || !this.loginData.password) {
      this.errorMessage = 'Por favor, completa todos los campos';
      return;
    }

    this.authService.login(this.loginData.email, this.loginData.password)
      .subscribe({
        next: (response) => {
          this.successMessage = 'Login exitoso!';
          this.router.navigate(['/']); // Nav
          // Almacenar el correo electrónico en localStorage
          localStorage.setItem('userEmail', response.user.fullName);
          // Refrescar la página
          window.location.reload();
        },
        error: (error) => {
          this.errorMessage = error.error.message || 'Login fallido';
        }
      });
  }

  onRegisterStep1() {
    if (!this.registrationStep1.email || !this.registrationStep1.password || !this.registrationStep1.confirmPassword) {
      this.errorMessage = 'Por favor, completa todos los campos';
      return;
    }

    if (this.registrationStep1.password !== this.registrationStep1.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return;
    }

    this.authService.registerStep1(this.registrationStep1.email, this.registrationStep1.password)
      .subscribe({
        next: (response) => {
          this.isStep1Complete = true;
          this.registrationStep2.email = this.registrationStep1.email;
          this.successMessage = 'Registro exitoso!';
          this.errorMessage = '';
        },
        error: (error) => {
          this.errorMessage = error.error.message || 'Registro fallido';
        }
      });
  }

  onCompleteRegistration() {
    if (!this.registrationStep2.fullName || !this.registrationStep2.gender || 
        !this.registrationStep2.phoneNumber || !this.registrationStep2.birthDate) {
      this.errorMessage = 'Por favor, completa todos los campos';
      return;
    }

    this.authService.completeRegistration(this.registrationStep2)
      .subscribe({
        next: (response) => {
          this.successMessage = 'Registro exitoso!';
          this.errorMessage = '';
          setTimeout(() => {
            this.isLoginMode = true;
            this.isStep1Complete = false;
          }, 2000);
        },
        error: (error) => {
          this.errorMessage = error.error.message || 'Registro fallido';
        }
      });
  }
}
