import { Component, inject, model } from '@angular/core';
import { TodosService } from '../../core/Services/todo.service';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-todo.component.html',
  styleUrl: './add-todo.component.scss'
})
export class AddTodoComponent {
   private _TodosService = inject(TodosService);
   private toaster = inject(ToastrService);
   newTodo : string = '';
   addNewTodo(){
    this._TodosService.addTodo(this.newTodo).subscribe({
      next : () => {
        this.newTodo = '';
        this.toaster.success("New Todo Added");
      }
    })
   }
}
