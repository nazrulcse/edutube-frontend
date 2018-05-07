// Imports
import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditComponent } from './users/profile/edit/edit.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './users/profile/profile.component';
import { LogoutComponent } from './logout/logout.component';

// Route Configuration
export const routes: Routes = [
  {
    path: '',
    component: HomeComponent // Remember to import the Home Component
  },
  { path: 'profile/edit', component: EditComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'logout', component: LogoutComponent }
];

export const Routing: ModuleWithProviders = RouterModule.forRoot(routes);