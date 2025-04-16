import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
import { Router } from '@angular/router'; // Import Angular Router
import { RouterModule } from '@angular/router'; // Import RouterModule for routing

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, RouterModule],
})
export class HomePage {
  constructor(private router: Router) {}

  // Navigate to the login page
  navigateToLogin() {
    this.router.navigate(['/login']); // Standard Angular routing
  }

  // Navigate to the create account page
  navigateToCreate() {
    this.router.navigate(['/create']); // Standard Angular routing
  }
}
