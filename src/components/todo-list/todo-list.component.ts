import { Component, inject, OnInit } from '@angular/core';
import { TodoListItemComponent } from "../../shared/UI/todo-list-item/todo-list-item.component";
import { MatTabsModule } from '@angular/material/tabs';
import { error } from 'console';
import { TodosService } from '../../core/Services/todo.service';
import { todos } from '../../core/Interfaces/todos';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [TodoListItemComponent, MatTabsModule],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  
  todos: todos[] = [];
  private _TodosService = inject(TodosService);
  error : string = "";
  

  getAllTasks() {
    this._TodosService.getTodos().subscribe({
      next : (todos) => {
        this.todos = todos;
        console.log(this.todos);
      },
      error : (error) => {
         console.log(error);
      }
    })
  } 
  getClosedTasks() {
  }

  getOpenedTasks() {
  }

  onTabChange(event: any) {
    switch (event.index) {
      case 0:
        this.getAllTasks();
        break;
      case 1:
        this.getClosedTasks();
        break;
      case 2:
        this.getOpenedTasks();
        break;
      default:
        break;
    }
  }
  ngOnInit() {
    this.getAllTasks();
  }
}