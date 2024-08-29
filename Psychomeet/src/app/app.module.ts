import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { RouterModule } from '@angular/router';
import { MakeConsultationComponent } from './views/app/consultation/make-consultation/make-consultation.component';
//import { AppRoutes } from './app.routes';

@NgModule({
  declarations: [
    //    AppComponent,
    //MakeConsultationComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    BrowserModule,
    FormsModule,
    //   RouterModule.forRoot(AppRoutes)
  ],
  providers: [],
  // bootstrap: [AppComponent]
})
export class AppModule { }
