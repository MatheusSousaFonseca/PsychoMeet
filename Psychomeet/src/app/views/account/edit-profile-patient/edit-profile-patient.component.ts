import { Component, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserUpdateService } from '../../../services/user/user-update-service';

@Component({
  selector: 'app-edit-profile-patient',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './edit-profile-patient.component.html',
  styleUrls: ['./edit-profile-patient.component.css']
})
export class EditProfilePatientComponent {

  @Input() form!: FormGroup; 

  constructor(
    private router: Router,
    private userUpdateService: UserUpdateService 
  ) {}

  voltar() {
    this.router.navigate(['account/my-profile-patient']);
  }

  async salvar() {
    if (this.form.valid) {
      const updatedUser = this.form.value;
    
      try {
        
        await this.userUpdateService.update(updatedUser);
        console.log("Usuário atualizado com sucesso!");
        this.router.navigate(['account/my-profile-patient']);
      } catch (error) {
        console.error("Erro ao atualizar o usuário:", error);
      }
    } else {
      console.error("Formulário inválido");
    }
  }


}
