import { Routes } from '@angular/router';
import { SignInPatientComponent } from './views/account/sign-in-patient/sign-in-patient.component';
import { SignUpPatientComponent } from './views/account/sign-up-patient/sign-up-patient.component';

import { HomeComponent } from './views/app/home/home.component';



export const routes: Routes = [
{
    path: 'account/sign-in',
    component: SignInPatientComponent,
},
{
    path: 'account/sign-up',
    component: SignUpPatientComponent,
},
{
    path: 'app/home',
    component: HomeComponent
},
{
    path: '',
    component: HomeComponent,
}
];

