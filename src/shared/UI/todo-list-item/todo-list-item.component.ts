import { Component, inject, Input, OnInit } from '@angular/core';
import {MatChipsModule} from '@angular/material/chips';
import { TodosService } from '../../../core/Services/todo.service';
import { ToastrService } from 'ngx-toastr';
import { todos } from '../../../core/Interfaces/todos';
import { NgClass } from '@angular/common';
import e from 'express';

@Component({
  selector: 'app-todo-list-item',
  standalone: true,
  imports: [MatChipsModule,NgClass],
  templateUrl: './todo-list-item.component.html',
  styleUrl: './todo-list-item.component.scss'
})
export class TodoListItemComponent {
  @Input({required : true}) todo! : todos;
  @Input({required : true}) userID! : string;
  private _TodosService = inject(TodosService);
  private toaster = inject(ToastrService);


  DeleteTodo() {
    this._TodosService.removeTodo(this.userID,this.todo.ID || "").subscribe({
      next : (res) => {
        this.toaster.error("Deleted Successfully");
        console.log(res);
      }
    })
  }
  UpdateTodo() {
    const currentStatus = this.todo.isCompleted ? "closed" : "opened";
    this.todo.isCompleted = !this.todo.isCompleted;
    this._TodosService.updateTodo(this.userID,this.todo).subscribe({
      next : (res) => {
        this.toaster.success(`Update Todo Successfully`); 
        this.updateList(currentStatus);
      }
    })
  }
  private updateList(currentStatus : string) {
    if(currentStatus == "closed"){
      this._TodosService.getCompletedTodos(this.userID).subscribe({
        next : (res) => {
          this._TodosService.closedtodos.next(res);
        }
      })
    }
    else {
      this._TodosService.getPendingTodos(this.userID).subscribe({
        next : (res) => {
          this._TodosService.openedtodos.next(res);
        }
      })
    }
  }
  changeButtonStyle() {
    return {
      "btn-primary" : this.todo.isCompleted,
      "btn-danger" : !this.todo.isCompleted
    }
  }
  changeTextStyle() {
    return {
      "text-primary" : this.todo.isCompleted,
      "text-danger" : !this.todo.isCompleted
    }
  }
}
