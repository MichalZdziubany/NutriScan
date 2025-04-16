import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';  // Router service
import { RouterModule } from '@angular/router'; // Import RouterModule for routing
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton} from '@ionic/angular/standalone';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  imports: [RouterModule, IonHeader, IonToolbar, IonTitle, IonContent, IonButton],
})
export class WelcomeComponent  implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {}

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToCreate() {
    this.router.navigate(['/create']);
  }
}
