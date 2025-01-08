import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/Services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  private toaster = inject(ToastrService);
  private _Router = inject(Router);
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
      {
       next : (res) => {
        this._Router.navigate(['/signin']);
        this.toaster.success("Signed Up Successfully");
      },
      error : (err) => {
        console.log(err);
      }
    });
  }
}
