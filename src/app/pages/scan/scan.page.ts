import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar , IonButton, IonCard,IonCardHeader,IonCardContent,IonCardTitle} from '@ionic/angular/standalone';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { Platform } from '@ionic/angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData } from 'chart.js';



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
  healthScoreColor: string = 'gray'; // Default color for health score
  chartData: ChartData = {
    labels: ['Sugar', 'Protein', 'Fiber', 'Saturated Fat', 'Salt'],
    datasets: [
      {
        data: [],
        backgroundColor: ['#ff6347', '#32cd32', '#4682b4', '#ff4500', '#ffd700'], // Colors for each nutrient
        hoverBackgroundColor: ['#ff4500', '#228b22', '#4169e1', '#ff6347', '#ffff00'],
      }
    ]
  };
  chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}g`;
          }
        }
      }
    }
  };

  constructor(private platform: Platform, private http: HttpClient) { }

  ngOnInit() {
  }

  async startScan() {
    const permission = await BarcodeScanner.checkPermission({ force: true });

    if (!permission.granted) {
      alert('Camera permission is required');
      return;
    }

    this.isScanning = true;
    BarcodeScanner.hideBackground(); // Make background transparent for camera preview
    document.body.classList.add('scanner-active'); // Optional styling

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

  fetchNutritionalInfo(barcode: string) {
    const url = `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`;

    this.http.get(url).subscribe(
      (response: any) => {
        if (response.product) {
          const product = response.product;
          const nutriments = product.nutriments || {};

          // Extract individual values (defaults if undefined)
          const energy = nutriments['energy-kcal_100g'] || 0;
          const sugar = nutriments['sugars_100g'] || 0;
          const saturatedFat = nutriments['saturated-fat_100g'] || 0;
          const salt = nutriments['salt_100g'] || 0;
          const fiber = nutriments['fiber_100g'] || 0;
          const protein = nutriments['proteins_100g'] || 0;

          // 🧠 Calculate health score
          let score = 100;
          score -= sugar * 3;
          score -= saturatedFat * 2.5;
          score -= salt * 2;
          score += fiber * 2;
          score += protein * 1.5;
          score -= energy / 100;
          score = Math.max(0, Math.min(100, score)); // Clamp between 0–100

          // Assign color based on health score
          if (score >= 75) {
            this.healthScoreColor = 'green';  // Healthy
          } else if (score >= 50) {
            this.healthScoreColor = 'yellow'; // Average
          } else {
            this.healthScoreColor = 'red';    // Unhealthy
          }

          // Store data including health score
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

          // Prepare chart data
          this.chartData.datasets[0].data = [sugar, protein, fiber, saturatedFat, salt];
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