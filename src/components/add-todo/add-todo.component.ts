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
        this.newTodo = '';
        this.toaster.success("New Todo Added");
      }
    })
   }
   ngOnInit(): void {
    this.userID = this._AuthService.getCurrentUser()?.uid || "";
   }

}
