import { Routes } from '@angular/router';
import { SignInPatientComponent } from './views/account/sign-in-patient/sign-in-patient.component';
import { SignUpPatientComponent } from './views/account/sign-up-patient/sign-up-patient.component';

import { HomeComponent } from './views/app/home/home.component';
import { MakeConsultationComponent } from './views/consultation/make-consultation/make-consultation.component';
import { PopUpAcceptConsultationComponent } from './views/pop-ups/pop-up-accept-consultation/pop-up-accept-consultation.component';
import { PopUpCancelConsultationComponent } from './views/pop-ups/pop-up-cancel-consultation/pop-up-cancel-consultation.component';
import { PopUpRefuseConsultationComponent } from './views/pop-ups/pop-up-refuse-consultation/pop-up-refuse-consultation.component';
import { ViewConsultationPatientComponent } from './views/consultation/view-consultation-patient/view-consultation-patient.component';
import { ViewConsultationPsychologistComponent } from './views/consultation/view-consultation-psychologist/view-consultation-psychologist.component';
import { ViewRequestConsultationComponent } from './views/consultation/view-request-consultation/view-request-consultation.component';
import { PopUpGiveFeedbackComponent } from './views/pop-ups/pop-up-give-feedback/pop-up-give-feedback.component';
import { PopUpInformAvailabilityComponent } from './views/pop-ups/pop-up-inform-availability/pop-up-inform-availability.component';
import { PopUpMakeConsultationComponent } from './views/pop-ups/pop-up-make-consultation/pop-up-make-consultation.component';
import { PopUpRescheduleConsultationComponent } from './views/pop-ups/pop-up-reschedule-consultation/pop-up-reschedule-consultation.component';
import { ViewScheduledConsultationComponent } from './views/consultation/view-scheduled-consultation/view-scheduled-consultation.component';



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
        path: 'consultation/view-consultation-patient',
        component: ViewConsultationPatientComponent,
    },
    {
        path: 'consultation/view-consultation-psychologist',
        component: ViewConsultationPsychologistComponent,
    },
    {
        path: 'consultation/view-request-consultation',
        component: ViewRequestConsultationComponent,
    },
    {
        path: 'consultation/view-scheduled-consultation',
        component: ViewScheduledConsultationComponent,
    },
    {
        path: 'pop-ups/pop-up-accept-consultation',
        component: PopUpAcceptConsultationComponent,
    },
    {
        path: 'pop-ups/pop-up-cancel-consultation',
        component: PopUpCancelConsultationComponent,
    },
    {
        path: 'pop-ups/pop-up-give-feedback',
        component: PopUpGiveFeedbackComponent,
    },
    {
        path: 'pop-ups/pop-up-inform-availability',
        component: PopUpInformAvailabilityComponent,
    },
    {
        path: 'pop-ups/pop-up-make-consultation',
        component: PopUpMakeConsultationComponent,
    },
    {
        path: 'pop-ups/pop-up-reschedule-consultation',
        component: PopUpRescheduleConsultationComponent,
    },
    {
        path: 'pop-ups/pop-up-refuse-consultation',
        component: PopUpRefuseConsultationComponent,
    }
];

