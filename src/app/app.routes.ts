// Imports
import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditComponent } from './users/profile/edit/edit.component';
import { HomeComponent } from './home/home.component';

// Route Configuration
export const routes: Routes = [
{
    path: '',
    component: HomeComponent // Remember to import the Home Component
  },
  { path: 'profile/edit', component: EditComponent }
];

export const Routing: ModuleWithProviders = RouterModule.forRoot(routes);