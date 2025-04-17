import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonButton} from '@ionic/angular/standalone';
import { HttpClient } from '@angular/common/http';
import { OpenAIService } from 'src/app/openai.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alternatives',
  templateUrl: './alternatives.page.html',
  styleUrls: ['./alternatives.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonButton]
})
export class AlternativesPage {
  healthierAlternatives: string = ''; // To store alternatives result

  constructor(private openAIService: OpenAIService, private router: Router) {}

  // Method to get the last scan result from localStorage
  getLastScanAndFetchAlternatives() {
    const lastScan = localStorage.getItem('lastScan');  // Retrieve the last scan data

    if (lastScan) {
      this.fetchAlternatives(lastScan);
    } else {
      console.error('No scan data found!');
    }
  }

  // Fetch healthier alternatives from OpenAI service
  fetchAlternatives(lastScanData: string) {
    this.openAIService.getHealthierAlternatives(lastScanData).subscribe(
      (response: any) => {
        if (response && response.choices && response.choices[0]) {
          this.healthierAlternatives = response.choices[0].text;  // Store the alternatives text
        } else {
          console.error('Invalid response from OpenAI');
        }
      },
      (error: any) => {
        console.error('Error fetching healthier alternatives:', error);
      }
    );
  }

  // Call this method when the user wants to fetch alternatives
  onFetchAlternativesClick() {
    this.getLastScanAndFetchAlternatives();
  }
}