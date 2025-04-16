import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'settings',
    loadComponent: () => import('./components/settings/settings.component').then(m => m.SettingsComponent)
  },
  {
    path: 'alternatives',
    loadComponent: () => import('./components/alternatives/alternatives.component').then(m => m.AlternativesComponent)
  },
  {
    path: 'create',
    loadComponent: () => import('./components/create-account/create-account.component').then(m => m.CreateAccountComponent)
  },
  {
    path: 'scan',
    loadComponent: () => import('./components/scan/scan.component').then(m => m.ScanComponent)
  },
  {
    path: 'result',
    loadComponent: () => import('./components/scan-result/scan-result.component').then(m => m.ScanResultComponent)
  },
  {
    path: 'history',
    loadComponent: () => import('./components/history/history.component').then(m => m.HistoryComponent)
  },
  {
    path: 'welcome',
    loadComponent: () => import('./components/welcome/welcome.component').then(m => m.WelcomeComponent)
  },
  {
    path: 'search',
    loadComponent: () => import('./components/manual-search/manual-search.component').then(m => m.ManualSearchComponent)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
