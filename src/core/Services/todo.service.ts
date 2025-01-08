import { inject, Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { todos } from '../Interfaces/todos';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  private _Firestore = inject(Firestore);
  todosCollection = collection(this._Firestore,"todos");
  getTodos() : Observable<todos[]> {
    return collectionData(this.todosCollection,
      {
        idField : "id"
      }
    ) as Observable<todos[]>
  }
  addTodo(task : string) : Observable<string> {
    const todoToCreate = {task , isCompleted : false};
    const promise = addDoc(this.todosCollection, todoToCreate).then(
      (response) => response.id
    );
    return from(promise);
  }
  removeTodo(todoId : string) : Observable<void> {
    const docRef = doc(this._Firestore, 'todos/' + todoId);
    const promise = deleteDoc(docRef);
    return from(promise);
  }
  updateTodo(todo : todos) : Observable<void> {
    const docRef = doc(this._Firestore, 'todos/' + todo.ID);
    const promise = setDoc(docRef, todo);
    return from(promise);
  }
}
