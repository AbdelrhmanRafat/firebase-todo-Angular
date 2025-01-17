import { Component, inject, OnInit } from '@angular/core';
import { TodoListItemComponent } from "../../shared/UI/todo-list-item/todo-list-item.component";
import { MatTabsModule } from '@angular/material/tabs';
import { error } from 'console';
import { TodosService } from '../../core/Services/todo.service';
import { todos } from '../../core/Interfaces/todos';
import { AuthService } from '../../core/Services/auth.service';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [TodoListItemComponent, MatTabsModule],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  
  todos: todos[] = [];
  closedTodos : todos[] = [];
  openedTodos : todos[] = [];
  private _TodosService = inject(TodosService);
  private _AuthService = inject(AuthService);
  userID : string = "";
  error : string = "";
  

  getAllTasks(userID : string) {
    this._TodosService.getTodos(userID).subscribe({
      next : (todos) => {
        this.todos = todos;
      }
    })
    this._TodosService.alltodos.subscribe({
      next : (res) => {
      this.todos = res;
      }
    })
  } 
  getClosedTasks(userID : string) {
    this._TodosService.getCompletedTodos(userID).subscribe({
      next : (todos) => {
        this.closedTodos = todos;
      }
    })
    this._TodosService.closedtodos.subscribe({
      next : (res) => {
      this.closedTodos = res;
      }
    })
  }
  getOpenedTasks(userID : string) {
    this._TodosService.getPendingTodos(userID).subscribe({
      next : (todos) => {
        this.openedTodos = todos;
      }
    })
    this._TodosService.openedtodos.subscribe({
      next : (res) => {
      this.openedTodos = res;
      }
    })
  }
  onTabChange(event: any) {
    switch (event.index) {
      case 0:
        this.getAllTasks(this.userID);
        break;
      case 1:
        this.getClosedTasks(this.userID);
        break;
      case 2:
        this.getOpenedTasks(this.userID);
        break;
      default:
        break;
    }
  }
  ngOnInit() {
    this.userID = this._AuthService.getCurrentUser()?.uid || "";
    this.getAllTasks(this.userID);
  }
}