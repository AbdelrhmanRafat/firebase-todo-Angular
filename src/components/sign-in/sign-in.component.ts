import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/Services/auth.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent  {
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _AuthService = inject(AuthService);
  private  _Router = inject(Router);
  SignInForm : FormGroup = this._FormBuilder.group({
    email : [null,[Validators.required,Validators.email]],
    password : [null,[Validators.required]]
  }) 
  SignIn() {
    const rawData = this.SignInForm.getRawValue();
    this._AuthService.signIn(
    rawData.email,
    rawData.password).subscribe({
      next : (res) => {
        this._Router.navigate(['/todohome']);
      },
      error : (err) => {
        console.log(err);
      }
    })
  }
  SignInWithGmail(){
  this._AuthService.signInWithGoogle().subscribe({
    next : () => {
      this._Router.navigate(['/todohome']);
    }
  })
  }
}
