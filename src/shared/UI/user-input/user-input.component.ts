import { Component, input, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.scss'
})
export class UserInputComponent {
  @Input({required : true}) controlName!: string;
  @Input({required : true}) strplaceHolder! : string;
  @Input() InputType! : string;
  
}
