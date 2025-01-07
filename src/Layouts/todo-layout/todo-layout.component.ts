import { Component } from '@angular/core';
import { MainNavBarComponent } from "../../components/main-nav-bar/main-nav-bar.component";
import { Router } from 'express';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-todo-layout',
  standalone: true,
  imports: [MainNavBarComponent,RouterOutlet],
  templateUrl: './todo-layout.component.html',
  styleUrl: './todo-layout.component.scss'
})
export class TodoLayoutComponent {

}
