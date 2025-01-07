import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/Services/auth.service';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {

  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _AuthService = inject(AuthService);
  SignUpForm : FormGroup = this._FormBuilder.nonNullable.group({
    username : ['',[Validators.required]],
    email : ['',[Validators.required,Validators.email]],
    password : ['',[Validators.required]]
  }) 
  SignUp() {
    const rawData = this.SignUpForm.getRawValue();
    this._AuthService.register(
    rawData.email,
    rawData.password,
    rawData.username).subscribe(
      () => {
        console.log("OK");
      })
  }
}
