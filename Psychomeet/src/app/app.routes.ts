import { Routes } from '@angular/router';
import { SignInPatientComponent } from './views/account/sign-in-patient/sign-in-patient.component';
import { SignUpPatientComponent } from './views/account/sign-up-patient/sign-up-patient.component';
import { HomeComponent } from './views/app/home/home.component';
import { MakeConsultationComponent } from './views/app/consultation/make-consultation/make-consultation.component';
import { ViewConsultationPatientComponent } from './views/app/consultation/view-consultation-patient/view-consultation-patient.component';
import { ViewConsultationPsychologistComponent } from './views/app/consultation/view-consultation-psychologist/view-consultation-psychologist.component';
import { ViewRequestConsultationComponent } from './views/app/consultation/view-request-consultation/view-request-consultation.component';
import { ViewScheduledConsultationComponent } from './views/app/consultation/view-scheduled-consultation/view-scheduled-consultation.component';
import { InformAvailabilityComponent } from './views/app/consultation/inform-availability/inform-availability.component';
import { SignInPsychologistComponent } from './views/account/sign-in-psychologist/sign-in-psychologist.component';
import { SearchPsychologistComponent } from './views/app/consultation/search-psychologist/search-psychologist.component';
import { MyProfilePatientComponent } from './views/account/my-profile-patient/my-profile-patient.component';
import { MyProfilePsichologistComponent } from './views/account/my-profile-psichologist/my-profile-psichologist.component';
import { EditProfilePsichologistComponent } from './views/account/edit-profile-psichologist/edit-profile-psichologist.component';
import { EditProfilePatientComponent } from './views/account/edit-profile-patient/edit-profile-patient.component';
import { EditPasswordComponent } from './views/account/edit-password/edit-password.component';
import { SignUpPsychologistComponent } from './views/account/sign-up-psychologist/sign-up-psychologist.component';



export const AppRoutes: Routes = [
    {
        path: 'account/sign-in-patient',
        component: SignInPatientComponent,
    },
    {
        path: 'account/edit-profile-psichologist',
        component: EditProfilePsichologistComponent,
    },
    {
        path: 'account/edit-profile-patient',
        component: EditProfilePatientComponent,
    },
    {
        path: 'account/sign-up-patient',
        component: SignUpPatientComponent,
    },
    {
        path: 'account/sign-in-psychologist',
        component: SignInPsychologistComponent,
    },
    {
        path: 'account/sign-up-psychologist',
        component: SignUpPsychologistComponent,
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
        path: 'consultation/make-consultation/:id',
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
        path: 'consultation/search-psychologist',
        component: SearchPsychologistComponent,
    },
    {
        path: 'consultation/inform-availability',
        component: InformAvailabilityComponent,
    },
    {
        path: 'account/my-profile-patient',
        component: MyProfilePatientComponent,
    },
    {
        path: 'account/edit-password',
        component: EditPasswordComponent,
    },
    {
        path: 'account/my-profile-psichologist',
        component: MyProfilePsichologistComponent,
    },
    {
        path: 'account/edit-password',
        component: EditPasswordComponent,
    }
];

