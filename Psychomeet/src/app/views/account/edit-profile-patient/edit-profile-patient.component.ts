import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserUpdateService } from '../../../services/user/user-update-service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';  // Import NgbActiveModal

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
    private userUpdateService: UserUpdateService,
    public activeModal: NgbActiveModal  // Inject NgbActiveModal
  ) {}

  voltar() {
    this.activeModal.dismiss();  // Dismiss the modal when going back
  }

  async salvar() {
    if (this.form.valid) {
      const updatedUser = this.form.value;

      try {
        // Call the update service to save the user
        await this.userUpdateService.update(updatedUser);
        console.log("Usuário atualizado com sucesso!");

        this.activeModal.close();  // Close the modal after a successful save
        this.router.navigate(['account/my-profile-patient']);
      } catch (error) {
        console.error("Erro ao atualizar o usuário:", error);
      }
    } else {
      console.error("Formulário inválido");
    }
  }
}
