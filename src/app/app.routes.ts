import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'login',
    title: 'Login',        
    loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent),
    },
    {
        path: '',
        loadComponent:()=> import ('./components/layout/layout.component').then(m => m.LayoutComponent),
        children:[{
            path: '',
            title: 'Dashboard',
            pathMatch:'full',         
            redirectTo:'dashboard',
        },
        {
            path: 'qa',
            title: 'Q%A',        
            loadComponent: () => import('./components/qa/qa.component').then(m => m.QaComponent),
        },
        {
            path: 'prescription',
            title: 'Prescription',
            loadComponent: () => import('./components/prescription/prescription.component').then(m => m.PrescriptionComponent),
        },
        {
            path: 'dashboard',
            title: 'Dashboard',           
            loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent),
        },
        {
            path: 'userDetails',
            title: 'User Details',           
            loadComponent: () => import('./components/details/details.component').then(m => m.DetailsComponent),
        },
        {
            path: '**',
            title: 'Error',           
            loadComponent: () => import('./components/error/error.component').then(m => m.ErrorComponent),
        }]
    }

];
