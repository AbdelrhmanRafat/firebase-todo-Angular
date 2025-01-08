import { Component, inject, OnInit } from '@angular/core';
import { TodoListItemComponent } from "../../shared/UI/todo-list-item/todo-list-item.component";
import { MatTabsModule } from '@angular/material/tabs';
import { TodoData } from '../../core/Interfaces/todo-data';
import { TodoService } from '../../core/Services/todo.service';
import { error } from 'console';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [TodoListItemComponent, MatTabsModule],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  
  todos: TodoData[] = [];
  error : string = "";
  private _TodoService = inject(TodoService);

    getAllTasks() {

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
    this._TodoService.getTodos().subscribe({
      next: (todos) => this.todos = todos,
      error: (err) => console.log(err)
    });
  }
}