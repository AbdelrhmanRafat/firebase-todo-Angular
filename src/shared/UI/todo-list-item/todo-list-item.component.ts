import { Component, Input } from '@angular/core';
import {MatChipsModule} from '@angular/material/chips';

@Component({
  selector: 'app-todo-list-item',
  standalone: true,
  imports: [MatChipsModule],
  templateUrl: './todo-list-item.component.html',
  styleUrl: './todo-list-item.component.scss'
})
export class TodoListItemComponent {
  @Input({required : true}) task! : string;
}
