import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar , IonButton, IonCard,IonCardHeader,IonCardContent,IonCardTitle} from '@ionic/angular/standalone';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { Platform } from '@ionic/angular';



@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonCard,IonCardHeader,IonCardContent, IonCardTitle]
})
export class ScanPage implements OnInit {
  scannedResult: string | null = null;
  isScanning = false;

  constructor(private platform: Platform) { }

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
    }

    this.stopScan();
  }

  stopScan() {
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    this.isScanning = false;
    document.body.classList.remove('scanner-active');
  }
}
