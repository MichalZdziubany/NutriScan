import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  setTheme(isDark: boolean) {
    if (isDark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }

    // Save the user's theme preference to local storage
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }

  // Get the current theme from local storage or default to light mode
  getCurrentTheme(): string {
    return localStorage.getItem('theme') || 'light';
  }
}