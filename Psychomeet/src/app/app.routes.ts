import { Routes } from '@angular/router';
import { SignInPatientComponent } from './views/account/sign-in-patient/sign-in-patient.component';
import { SignUpPatientComponent } from './views/account/sign-up-patient/sign-up-patient.component';

import { HomeComponent } from './views/app/home/home.component';
import { MakeConsultationComponent } from './views/consultation/make-consultation/make-consultation.component';



export const AppRoutes: Routes = [
{
    path: 'account/sign-in-patient',
    component: SignInPatientComponent,
},
{
    path: 'account/sign-up-patient',
    component: SignUpPatientComponent,
},
{
    path: 'app/home',
    component: HomeComponent
},
{
    path: '',
    component: HomeComponent,
},
{
    path: 'consultation/make-consultation',
    component: MakeConsultationComponent,
}
];

