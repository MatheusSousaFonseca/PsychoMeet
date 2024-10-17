import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { consultationFeedback } from "../../domain/dto/consultation-feedback";
import { firstValueFrom } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  export class ConsultationFeedbackService {
  
    constructor(private http: HttpClient) {}
  
    async update(feedback: consultationFeedback) {
      console.log(`Enviando o feedback...`);
      console.log(feedback);
  
      // Update the endpoint to match your API for posting feedback
      return await firstValueFrom(this.http.put(`http://localhost:8081/api/consulta/feedback`, feedback));
    }
  }