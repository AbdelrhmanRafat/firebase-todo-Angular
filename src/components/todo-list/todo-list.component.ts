import { Component } from '@angular/core';
import { TodoListItemComponent } from "../../shared/UI/todo-list-item/todo-list-item.component";
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [TodoListItemComponent, MatTabsModule],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  todoList: string[] = [];

  constructor() {
    this.getAllTasks(); // Initialize the list with "All" tasks
  }

  getAllTasks() {
    this.todoList = ["go to gym", "start studying"];
  }

  getClosedTasks() {
    this.todoList = ["go to gym 2", "start studying 2"];
  }

  getOpenedTasks() {
    this.todoList = ["go to gym 3", "start studying 3"];
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
}
