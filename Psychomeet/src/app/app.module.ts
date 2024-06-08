import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MakeConsultationComponent } from './views/consultation/make-consultation/make-consultation.component'; 

@NgModule({
  declarations: [
    AppComponent,
    MakeConsultationComponent 
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
