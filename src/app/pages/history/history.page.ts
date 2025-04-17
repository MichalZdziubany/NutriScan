import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar , IonSpinner, IonCard, IonCardContent, IonCardHeader,IonCardTitle, IonText} from '@ionic/angular/standalone';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { ToolbarComponent } from 'src/app/toolbar/toolbar.component';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonSpinner, IonCard, IonCardContent, IonCardHeader,IonCardTitle, ToolbarComponent,IonText],
})
export class HistoryPage implements OnInit {

  history$: Observable<any[]> = of([]);

  constructor(private firestore: Firestore) {}

  ngOnInit() {
    const scansRef = collection(this.firestore, 'scans');
    this.history$ = collectionData(scansRef, { idField: 'id' });
  }

  getHealthColor(score: number): string {
    if (score >= 75) return 'green';
    if (score >= 50) return 'yellow';
    return 'red';
  }
}
