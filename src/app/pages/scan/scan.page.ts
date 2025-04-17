import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar , IonButton, IonCard,IonCardHeader,IonCardContent,IonCardTitle} from '@ionic/angular/standalone';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { Platform } from '@ionic/angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData } from 'chart.js';

// 🟡 Firebase Firestore Imports
import { Firestore, collection, addDoc, query, getDocs, where } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonCard,IonCardHeader,IonCardContent, IonCardTitle,HttpClientModule,BaseChartDirective]
})
export class ScanPage implements OnInit {
  scannedResult: string | null = null;
  nutritionalInfo: any = null;
  isScanning = false;
  healthScoreColor: string = 'gray';

  chartData: ChartData = {
    labels: ['Sugar', 'Protein', 'Fiber', 'Saturated Fat', 'Salt'],
    datasets: [
      {
        data: [],
        backgroundColor: ['#ff6347', '#32cd32', '#4682b4', '#ff4500', '#ffd700'],
        hoverBackgroundColor: ['#ff4500', '#228b22', '#4169e1', '#ff6347', '#ffff00'],
      }
    ]
  };

  chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}g`;
          }
        }
      }
    }
  };

  // 🔥 Inject Firestore
  constructor(private platform: Platform, private http: HttpClient, private firestore: Firestore,private router: Router) { }

  ngOnInit() {}

  async startScan() {
    const permission = await BarcodeScanner.checkPermission({ force: true });

    if (!permission.granted) {
      alert('Camera permission is required');
      return;
    }

    this.isScanning = true;
    BarcodeScanner.hideBackground();
    document.body.classList.add('scanner-active');

    const result = await BarcodeScanner.startScan();

    if (result.hasContent) {
      this.scannedResult = result.content;
      this.fetchNutritionalInfo(this.scannedResult);

    }

    this.stopScan();
  }

  stopScan() {
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    this.isScanning = false;
    document.body.classList.remove('scanner-active');
  }

  async fetchNutritionalInfo(barcode: string) {
    const url = `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`;

    this.http.get(url).subscribe(
      async (response: any) => {
        if (response.product) {
          const product = response.product;
          const nutriments = product.nutriments || {};

          const energy = nutriments['energy-kcal_100g'] || 0;
          const sugar = nutriments['sugars_100g'] || 0;
          const saturatedFat = nutriments['saturated-fat_100g'] || 0;
          const salt = nutriments['salt_100g'] || 0;
          const fiber = nutriments['fiber_100g'] || 0;
          const protein = nutriments['proteins_100g'] || 0;

          let score = 100;
          score -= sugar * 3;
          score -= saturatedFat * 2.5;
          score -= salt * 2;
          score += fiber * 2;
          score += protein * 1.5;
          score -= energy / 100;
          score = Math.max(0, Math.min(100, score));

          if (score >= 75) {
            this.healthScoreColor = 'green';
          } else if (score >= 50) {
            this.healthScoreColor = 'yellow';
          } else {
            this.healthScoreColor = 'red';
          }

          this.nutritionalInfo = {
            foodName: product.product_name || 'Unknown Product',
            brand: product.brands || 'Unknown Brand',
            image: product.image_front_url || product.image_url || null,
            nutriments: nutriments,
            healthScore: Math.round(score),
            sugar,
            protein,
            fiber,
            saturatedFat,
            salt
          };

          this.chartData.datasets[0].data = [sugar, protein, fiber, saturatedFat, salt];

          localStorage.setItem('lastScan', JSON.stringify(this.nutritionalInfo));

          const scansRef = collection(this.firestore, 'scans');
          const q = query(scansRef, where('barcode', '==', barcode));
          const querySnapshot = await getDocs(q);

          if (querySnapshot.empty) {
            // If barcode does not exist, save the product data to Firestore
            await addDoc(scansRef, {
              barcode,
              timestamp: new Date(),
              ...this.nutritionalInfo
            });
            console.log('Product saved to Firestore');
          } else {
            console.log('Barcode already exists in Firestore.');
          }
          
        } else {
          alert('Product not found!');
        }
      },
      (error) => {
        console.error('Error fetching data from OpenFoodFacts:', error);
        alert('Error retrieving product data');
      }
    );
  }
}