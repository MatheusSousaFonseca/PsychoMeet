import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PsychologistUpdateService } from '../../../services/psychologist/psychologist-update.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';  // Import NgbActiveModal
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { PsychologistReadService } from '../../../services/psychologist/psychologist-read.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ImageService } from '../../../services/image/image-service';

@Component({
selector: 'app-edit-profile-psichologist',
standalone: true,
imports: [ReactiveFormsModule, MatFormFieldModule,CommonModule, MatOptionModule, MatSelectModule],
templateUrl: './edit-profile-psichologist.component.html',
styleUrls: ['./edit-profile-psichologist.component.css']
})
export class EditProfilePsichologistComponent {

form!: FormGroup;
abordagensList: string[] = [];
especialidadesList: string[] = [];
psychologistId : number | undefined;
previewImageSrc: string | undefined; // For previewing uploaded image
  uploadedImage: File | null = null; // Store the uploaded file
  imageSrc: string | undefined; // Existing image

  constructor(
private router: Router,
private formBuilder: FormBuilder,
private psychologistReadService: PsychologistReadService,
private psychologistUpdateService: PsychologistUpdateService,
private http: HttpClient,
private route: ActivatedRoute,
private toastr: ToastrService,
private imageService: ImageService
) { }

ngOnInit(): void {
this.form = this.formBuilder.group({
nome: ['', Validators.required],  // Nome cannot be blank
      email: ['', [Validators.required, Validators.email]],  // Email must be valid
      senha: ['', Validators.required],  // Senha cannot be blank
      repeatPassword: ['', Validators.required],  // Repeat password cannot be blank
      crp: ['', [Validators.required, Validators.pattern('^[0-9]{7}$')]],  // CRP: exactly 7 digits
      cpf: ['', [Validators.required, Validators.pattern('^[0-9]{11}$')]],  // CPF: exactly 11 digits
      data: ['', Validators.required],  // Data de nascimento cannot be blank
      telefone: ['', [Validators.required, Validators.pattern('^[0-9]{11}$')]],  // Telefone: exactly 11 digits
      descricao: ['', Validators.required],  // Descrição cannot be blank
      especialidades: new FormControl([], Validators.required),  // Especialidades cannot be blank
      abordagens: new FormControl([], Validators.required)  // Abordagens cannot be blank
    });

this.loadPsychologist();
this.loadAbordagens();
this.loadEspecialidades();
}

async loadPsychologist() {
let email = localStorage.getItem("email");
let psychologist = await this.psychologistReadService.findByEmail(email!);
this.psychologistId = psychologist.id;
if (psychologist) {
this.form.patchValue(psychologist);
}
}

loadAbordagens() {
this.http.get<{ abordagens: string[] }>('assets/abordagens.json')
.subscribe(data => {
this.abordagensList = data.abordagens;
});
}

loadEspecialidades() {
this.http.get<{ especialidades: string[] }>('assets/especialidades.json')
.subscribe(data => {
this.especialidadesList = data.especialidades;
});
}

async salvar() {

try {
await this.psychologistUpdateService.update(this.form.value, this.psychologistId);
// If an image was uploaded, upload it to the server
        if (this.uploadedImage) {
await this.imageService.uploadImage(this.psychologistId!, this.uploadedImage);
}
this.router.navigate(['/account/my-profile-psichologist']);
} catch (error) {
console.error('Error updating psychologist:', error);
this.toastr.error('Erro ao atualizar psicologo, tente novamente mais tarde!');
}
}

onImageUpload(event: Event) {
const input = event.target as HTMLInputElement;
if (input.files && input.files[0]) {
this.uploadedImage = input.files[0];
const reader = new FileReader();
reader.onload = (e: any) => {
this.previewImageSrc = e.target.result;
};
reader.readAsDataURL(this.uploadedImage);
}
}


voltar() {
this.router.navigate(['/account/my-profile-psichologist']);
}


}
