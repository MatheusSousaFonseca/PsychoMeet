import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Paciente } from '../../domain/model/paciente-model';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Retrieve the token
    return new HttpHeaders({
      Authorization: `Bearer ${token}` // Add the token to the headers
    });
  }

  // Fetch image by pessoaId
  fetchImageByPessoaId(pessoaId: number): Promise<Blob> {
    return firstValueFrom(
      this.http.get(`http://localhost:8080/api/pessoa/${pessoaId}/foto`, {
        headers: this.getHeaders(),
        responseType: 'blob' // Expect a binary image response
      })
    );
  }

  // Upload image for a pessoaId
  uploadImage(pessoaId: number, file: File): Promise<void> {
    const formData = new FormData();
    formData.append('file', file);

    return firstValueFrom(
      this.http.post<void>(`http://localhost:8080/api/pessoa/${pessoaId}/upload-foto`, formData, {
        headers: this.getHeaders()
      })
    );
  }

}
