import { Component } from '@angular/core';
import { AuthNavBarComponent } from "../../components/auth-nav-bar/auth-nav-bar.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [AuthNavBarComponent,RouterOutlet],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss'
})
export class AuthLayoutComponent {

}
