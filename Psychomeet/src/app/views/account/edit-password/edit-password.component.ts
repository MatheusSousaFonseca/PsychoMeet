import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserPasswordService } from '../../../services/user/user-password-service';

@Component({
  selector: 'app-edit-password',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.css']
})
export class EditPasswordComponent implements OnInit{

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userPasswordService: UserPasswordService
  ) {}
  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordsMatch });
  }

  passwordsMatch(group: FormGroup) {
    const newPassword = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { notMatching: true };
  }

  async resetPassword() {
    if (this.form.invalid) {
      console.error('Formulário inválido');
      return;
    }

    const formData = this.form.value;

    try {
      // Fazendo a chamada ao backend para resetar a senha
      await this.userPasswordService.updatePassword({
        email: formData.email,
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword
      });

      console.log('Senha alterada com sucesso!');
      this.router.navigate(['app/home']);
    } catch (error) {
      console.error('Erro ao alterar a senha', error);
    }
  }

}
