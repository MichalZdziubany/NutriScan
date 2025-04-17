import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonCardSubtitle,
  IonText
} from '@ionic/angular/standalone';
import { RouterModule, Router } from '@angular/router';
import { ToolbarComponent } from 'src/app/toolbar/toolbar.component'; // Import ToolbarComponent

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    RouterModule,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonCardTitle,
    IonCardSubtitle,
    ToolbarComponent,
    IonText
  ],
})
export class HomePage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  navigateTo(path: string) {
    this.router.navigate([`/${path}`]);
  }

  
}
