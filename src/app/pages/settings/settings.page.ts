import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonButton,
  IonModal,
  IonButtons,
  IonText,
  IonInput,
} from '@ionic/angular/standalone';
import { FirebaseService } from 'src/app/firebase.service';
import { Router, RouterModule } from '@angular/router';
import { ToolbarComponent } from 'src/app/toolbar/toolbar.component';
import { ThemeService } from 'src/app/theme.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonItem,
    IonLabel,
    IonButton,
    RouterModule,
    IonModal,
    IonButtons,
    IonText,
    IonInput,
    ToolbarComponent
  ],
})
export class SettingsPage implements OnInit {
  passwordForDeletion: string = ''; // Password for account deletion
  errorMessage: string = ''; // To show error messages
  isDeleteModalOpen: boolean = false; // Control modal visibility
  currentTheme: string = 'light';

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private themeService: ThemeService
  ) {}

  ngOnInit() {
    // Get the current theme from local storage
    this.currentTheme = this.themeService.getCurrentTheme();
    
    // Apply the theme at app startup
    this.themeService.setTheme(this.currentTheme === 'dark');
  }

  toggleTheme() {
    const isDark = this.currentTheme === 'dark';
    this.currentTheme = isDark ? 'light' : 'dark';
    this.themeService.setTheme(!isDark);
  }

  async signOut() {
    try {
      await this.firebaseService.signOutUser();
      this.router.navigate(['/login']); // Navigate to login page after sign-out
    } catch (error: any) {
      this.errorMessage = error.message;
    }
  }

  showDeleteConfirmation() {
    this.isDeleteModalOpen = true; // Open the modal for confirmation
  }

  closeDeleteModal() {
    this.isDeleteModalOpen = false; // Close the modal
  }

  async deleteAccount() {
    if (this.passwordForDeletion) {
      try {
        await this.firebaseService.deleteUserAccount(this.passwordForDeletion);
        this.isDeleteModalOpen = false; // ✅ Close modal
        this.passwordForDeletion = ''; // Clear the password field
        this.errorMessage = ''; // Clear any previous error messages
        this.router.navigate(['/login']); // Navigate to login page after account deletion
      } catch (error: any) {
        this.errorMessage = error.message; // Display error if deletion fails
      }
    } else {
      this.errorMessage = 'Please enter your password to delete the account.';
    }
  }
}
