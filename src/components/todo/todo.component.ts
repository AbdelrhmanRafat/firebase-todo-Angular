import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/Services/auth.service';
import { AddTodoComponent } from "../add-todo/add-todo.component";
import { Router } from '@angular/router';
import { TodoListComponent } from "../todo-list/todo-list.component";

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [AddTodoComponent, TodoListComponent],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent {

  private readonly _AuthService = inject(AuthService);
  private _Router = inject(Router);
  signOut() {
    this._AuthService.logout().subscribe({
      next : (res) => {
        this._Router.navigate(['/signin']);
      }
    });
    }
}
