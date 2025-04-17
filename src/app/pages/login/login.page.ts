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
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonCardHeader,
  IonText,
} from '@ionic/angular/standalone';
import { Router, RouterModule } from '@angular/router'; // Import Angular Router
import { FirebaseService } from 'src/app/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
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
    IonCard,
    IonCardContent,
    IonCardTitle,
    IonCardHeader,
    IonText,
  ],
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private firebaseService: FirebaseService,
    private router: Router
  ) {}

  ngOnInit() {
    // Check if the user is already signed in on page load
    this.checkUserSignedIn();
  }

  // Check if the user is signed in, and redirect if true
  checkUserSignedIn() {
    const user = this.firebaseService.getAuth().currentUser; // Get the current user
    if (user) {
      // If the user is already signed in, redirect to home page
      this.router.navigate(['/home']);
    }
  }

  // Login with email and password
  async login() {
    try {
      if (this.email && this.password) {
        await this.firebaseService.loginWithEmailAndPassword(
          this.email,
          this.password
        );
        this.email = '';
        this.password = '';
        this.router.navigate(['/home']); // Redirect to home page after successful login
      } else {
        this.errorMessage = 'Please enter both email and password.';
      }
    } catch (error: unknown) {
      // Check if the error is an instance of the Error object
      if (error instanceof Error) {
        this.errorMessage = error.message; // Safely access the error message
      } else {
        this.errorMessage = 'An unknown error occurred.';
      }
    }
  }

  // Google sign-in
  async googleSignIn() {
    try {
      const userCredential = await this.firebaseService.googleSignIn();
      console.log('User Signed In:', userCredential);  // Check this in the console
      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      this.errorMessage = 'An error occurred during sign-in. Please try again.';
    }
  }
}
