import { Routes } from '@angular/router';
import { SignInPatientComponent } from './views/account/sign-in-patient/sign-in-patient.component';
import { SignUpPatientComponent } from './views/account/sign-up-patient/sign-up-patient.component';

import { HomeComponent } from './views/app/home/home.component';
import { MakeConsultationComponent } from './views/consultation/make-consultation/make-consultation.component';
import { PopUpAcceptConsultationComponent } from './views/pop-ups/pop-up-accept-consultation/pop-up-accept-consultation.component';
import { PopUpCancelConsultationComponent } from './views/pop-ups/pop-up-cancel-consultation/pop-up-cancel-consultation.component';
import { PopUpRefuseConsultationComponent } from './views/pop-ups/pop-up-refuse-consultation/pop-up-refuse-consultation.component';



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
    },
    {
        path: 'consultation/view-request-consultation',
        component: MakeConsultationComponent,
    },
    {
        path: 'pop-ups/pop-up-accept-consultation',
        component: PopUpAcceptConsultationComponent,
    },
    {
        path: 'pop-ups/pop-up-refuse-consultation',
        component: PopUpRefuseConsultationComponent,
    }
];

