import { Component, inject, model, OnInit } from '@angular/core';
import { TodosService } from '../../core/Services/todo.service';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../core/Services/auth.service';

@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-todo.component.html',
  styleUrl: './add-todo.component.scss'
})
export class AddTodoComponent implements OnInit {
   private _TodosService = inject(TodosService);
   private toaster = inject(ToastrService);
   private _AuthService = inject(AuthService);
   private userID : string = "";
   newTodo : string = '';
   addNewTodo(){
    this._TodosService.addTodo(this.userID,this.newTodo).subscribe({
      next : () => {
        this.toaster.success("New Todo Added");
      }
    })
    this._TodosService.getTodos(this.userID).subscribe({
      next : (res) => {
        this._TodosService.alltodos.next(res);
      }
    })
    this.newTodo = "";
   }

   ngOnInit(): void {
    this.userID = this._AuthService.getCurrentUser()?.uid || "";
   }

}
