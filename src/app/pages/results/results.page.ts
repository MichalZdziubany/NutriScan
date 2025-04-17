import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardContent, IonCardTitle, IonCardHeader} from '@ionic/angular/standalone';

@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonCardContent, IonCardTitle, IonCardHeader]
})
export class ResultsPage implements OnInit {

  constructor() { }

  lastScan: any = null;

  ngOnInit() {
    const data = localStorage.getItem('lastScan');
    if (data) {
      this.lastScan = JSON.parse(data);
    }
  }
}

