import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/Services/auth.service';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent {

  private readonly _AuthService = inject(AuthService);

  signOut() {
    this._AuthService.logout().subscribe({
      next : (res) => {
         console.log("Logged Out");
      }
    });
    }
}
