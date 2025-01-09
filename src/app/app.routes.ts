import { Routes } from '@angular/router';
import { AuthLayoutComponent } from '../Layouts/auth-layout/auth-layout.component';
import { TodoLayoutComponent } from '../Layouts/todo-layout/todo-layout.component';
import { isUserLoggedGuard } from '../core/Gurads/is-user-logged.guard';
import { isUserNotLoggedGuard } from '../core/Gurads/is-user-not-logged.guard';
import { AddTodoComponent } from '../components/add-todo/add-todo.component';
import { SignInComponent } from '../components/sign-in/sign-in.component';
import { SignUpComponent } from '../components/sign-up/sign-up.component';
import { TodoComponent } from '../components/todo/todo.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate : [isUserLoggedGuard],
    children: [
      { path: '', redirectTo: 'signin', pathMatch: 'full' },
      { path: 'signin', component: SignInComponent },
      { path: 'signup', component: SignUpComponent },
    ],
  },
  {
    path: '',
    component: TodoLayoutComponent,
    canActivate : [isUserNotLoggedGuard],
    children: [
      { path: '', redirectTo: 'todohome', pathMatch: 'full' },
      { path: 'todohome', component: TodoComponent },
    ],
  }
];
