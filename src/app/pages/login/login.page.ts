import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton ,IonItem, IonLabel} from '@ionic/angular/standalone';
import { Router ,RouterModule} from '@angular/router'; // Import Angular Router

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterModule
            , IonButton, IonItem, IonLabel]
})
export class LoginPage implements OnInit {
  
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {}
  
  ngOnInit() {
    //if user is logged in then redirect to home page
    // Placeholder: Check if user is logged in (Firebase will be added later)
  }

  // Login method to be implemented when Firebase is added later
  async login() {
    // Placeholder: Firebase will be added here later for login functionality
    console.log('Email:', this.email, 'Password:', this.password);
    // For now, assume login is successful and navigate to the home page
    this.router.navigate(['/home']);
  }
}
