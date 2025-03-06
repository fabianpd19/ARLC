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

  // Registration form - Step 1
  registrationStep1 = {
    email: '',
    password: '',
    confirmPassword: ''
  };

  // Registration form - Step 2
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
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    this.authService.login(this.loginData.email, this.loginData.password)
      .subscribe({
        next: (response) => {
          this.successMessage = 'Login successful!';
          this.router.navigate(['/']); // Navigate to home page
        },
        error: (error) => {
          this.errorMessage = error.error.message || 'Login failed';
        }
      });
  }

  onRegisterStep1() {
    if (!this.registrationStep1.email || !this.registrationStep1.password || !this.registrationStep1.confirmPassword) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    if (this.registrationStep1.password !== this.registrationStep1.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    this.authService.registerStep1(this.registrationStep1.email, this.registrationStep1.password)
      .subscribe({
        next: (response) => {
          this.isStep1Complete = true;
          this.registrationStep2.email = this.registrationStep1.email;
          this.successMessage = 'Step 1 completed successfully!';
          this.errorMessage = '';
        },
        error: (error) => {
          this.errorMessage = error.error.message || 'Registration failed';
        }
      });
  }

  onCompleteRegistration() {
    if (!this.registrationStep2.fullName || !this.registrationStep2.gender || 
        !this.registrationStep2.phoneNumber || !this.registrationStep2.birthDate) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    this.authService.completeRegistration(this.registrationStep2)
      .subscribe({
        next: (response) => {
          this.successMessage = 'Registration completed successfully!';
          this.errorMessage = '';
          setTimeout(() => {
            this.isLoginMode = true;
            this.isStep1Complete = false;
          }, 2000);
        },
        error: (error) => {
          this.errorMessage = error.error.message || 'Registration completion failed';
        }
      });
  }
}
