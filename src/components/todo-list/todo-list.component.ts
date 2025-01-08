import { Component, inject, OnInit } from '@angular/core';
import { TodoListItemComponent } from "../../shared/UI/todo-list-item/todo-list-item.component";
import { MatTabsModule } from '@angular/material/tabs';
import { error } from 'console';
import { todos } from '../../core/Interfaces/todo-data';
import { TodosService } from '../../core/Services/todo.service';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [TodoListItemComponent, MatTabsModule],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  
  todos: todos[] = [];
  error : string = "";
  private _TodoService = inject(TodosService);

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
  }
}