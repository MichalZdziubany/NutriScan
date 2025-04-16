import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonItem,
  IonLabel,
  IonInput,
} from '@ionic/angular/standalone';
import { Router, RouterModule } from '@angular/router';
import { FirebaseService } from 'src/app/firebase.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    RouterModule,
    IonButton,
    IonItem,
    IonLabel,
    IonInput,
  ],
})
export class RegisterPage {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';

  constructor(
    private firebaseService: FirebaseService,
    private router: Router
  ) {}

  async register() {
    // Check if password and confirm password match
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match!';
      return;
    }

    if (this.email && this.password) {
      try {
        await this.firebaseService.registerWithEmailAndPassword(
          this.email,
          this.password
        );
        // Redirect to login or home page after successful registration
        this.router.navigate(['/login']);
      } catch (error: any) {
        // Handle Firebase errors
        this.errorMessage = error.message;
      }
    } else {
      this.errorMessage = 'Please enter both email and password.';
    }
  }

  // Google sign-in
  async googleSignIn() {
    try {
      await this.firebaseService.googleSignIn();
      this.router.navigate(['/home']); // Navigate to home after Google sign-in
    } catch (error: unknown) {
      // Check if the error is an instance of the Error object
      if (error instanceof Error) {
        this.errorMessage = error.message; // Safely access the error message
      } else {
        this.errorMessage = 'An unknown error occurred.';
      }
    }
  }
}
