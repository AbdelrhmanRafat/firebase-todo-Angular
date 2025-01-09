import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../core/Services/auth.service';
import { AddTodoComponent } from "../add-todo/add-todo.component";
import { Router } from '@angular/router';
import { TodoListComponent } from "../todo-list/todo-list.component";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [AddTodoComponent, TodoListComponent],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent implements OnInit {
  private readonly _AuthService = inject(AuthService);
  private _Router = inject(Router);
  private toaster = inject(ToastrService);
  userName : string = "";
  signOut() {
    this._AuthService.logout().subscribe({
      next : (res) => {
        this._Router.navigate(['/signin']);
        this.toaster.success("Logged Out");
      }
    });
    }
    ngOnInit(): void {
      this.userName = this._AuthService.getCurrentUser()?.displayName || "";
    }
}
