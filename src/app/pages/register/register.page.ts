import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton ,IonItem, IonLabel, IonInput} from '@ionic/angular/standalone';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterModule
        , IonButton, IonItem, IonLabel, IonInput]
})
export class RegisterPage implements OnInit {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {}
  ngOnInit(){
    // Placeholder: Check if user is logged in (Firebase will be added later)
    // If user is logged in, redirect to home page
  }

  // Register method to be replaced with Firebase registration logic later
  register() {
    if (this.email && this.password) {
      // Placeholder: Firebase will be added here later
      console.log('Email:', this.email, 'Password:', this.password);
      
      // After "successful" registration, navigate to the login page or home page
      this.router.navigate(['/login']);  // Redirect to login page
    } else {
      this.errorMessage = 'Please enter both email and password.';
    }
  }
}