import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MakeConsultationComponent } from './views/consultation/make-consultation/make-consultation.component';
import { RouterModule } from '@angular/router';
//import { AppRoutes } from './app.routes';

@NgModule({
  declarations: [
//    AppComponent,
    MakeConsultationComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
 //   RouterModule.forRoot(AppRoutes)
  ],
  providers: [],
 // bootstrap: [AppComponent]
})
export class AppModule { }
