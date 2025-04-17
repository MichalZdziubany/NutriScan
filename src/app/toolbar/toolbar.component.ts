import { IonicModule } from '@ionic/angular'; // Import IonicModule
import { CommonModule } from '@angular/common'; // Import CommonModule
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';  // Import Location service

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule] // Import IonicModule here
})
export class ToolbarComponent {

  constructor(private location: Location,private router: Router) {}

  goHome() {
    this.router.navigate(['/home']);
  }

  goBack() {
    this.location.back();
  }
}
