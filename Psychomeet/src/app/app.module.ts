import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { RouterModule } from '@angular/router';
import { MakeConsultationComponent } from './views/app/consultation/make-consultation/make-consultation.component'; // Componente não standalone

@NgModule({
  declarations: [
    MakeConsultationComponent // Declarando o componente não standalone
  ],
  imports: [
    CommonModule,
    NgbModule,
    BrowserModule,
    FormsModule,
    MatCardModule,
    MatDatepickerModule,
    RouterModule,
    ReactiveFormsModule
    // RouterModule.forRoot(AppRoutes)
  ],
  providers: [
    provideNativeDateAdapter()
  ]
})
export class AppModule { }
