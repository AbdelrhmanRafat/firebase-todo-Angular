import { inject, Injectable } from '@angular/core';
import { 
  addDoc, 
  collection, 
  collectionData, 
  deleteDoc, 
  doc, 
  Firestore, 
  query, 
  setDoc, 
  where
} from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { todos } from '../Interfaces/todos';
import { FirebaseWrapperService } from '../wrapper/firebase-wrapper.service';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  private _Firestore = inject(Firestore);
  private wrapper = inject(FirebaseWrapperService);
  alltodos = new BehaviorSubject<todos[] | []>([]);
  closedtodos = new BehaviorSubject<todos[] | []>([]);
  openedtodos = new BehaviorSubject<todos[] | []>([]);

  /**
   * Get todos for a specific user
   * @param userId - The ID of the user
   * @returns Observable of todos array
   */
  getTodos(userId: string): Observable<todos[]> {
    const todosCollection = collection(this._Firestore, `users/${userId}/todos`);
    return collectionData(todosCollection, {
      idField: 'ID'
    }) as Observable<todos[]>;
  }
    // Get todos where isCompleted is true
    getCompletedTodos(userId: string): Observable<todos[]> {
      const todosCollection = collection(this._Firestore, `users/${userId}/todos`);
      const completedQuery = query(todosCollection, where('isCompleted', '==', true));
      return collectionData(completedQuery, {
        idField: 'ID',
      }) as Observable<todos[]>;
    }
  
    // Get todos where isCompleted is false
    getPendingTodos(userId: string): Observable<todos[]> {
      const todosCollection = collection(this._Firestore, `users/${userId}/todos`);
      const pendingQuery = query(todosCollection, where('isCompleted', '==', false));
      return collectionData(pendingQuery, {
        idField: 'ID',
      }) as Observable<todos[]>;
    }

  /**
   * Add a new todo for a specific user
   * @param userId - The ID of the user
   * @param task - The task description
   * @returns Observable with the created todo ID
   */
  addTodo(userId: string, task: string): Observable<string> {
    const todosCollection = collection(this._Firestore, `users/${userId}/todos`);
    const todoToCreate = { task, isCompleted: false };
    const promise = addDoc(todosCollection, todoToCreate).then(
      (response) => response.id
    );
    return this.wrapper.wrapRequest(promise);
  }

  /**
   * Remove a todo for a specific user
   * @param userId - The ID of the user
   * @param todoId - The ID of the todo to remove
   * @returns Observable with the result of the deletion
   */
  removeTodo(userId: string, todoId: string): Observable<void> {
    const docRef = doc(this._Firestore, `users/${userId}/todos/${todoId}`);
    const promise = deleteDoc(docRef);
    return this.wrapper.wrapRequest(promise);
  }

  /**
   * Update a todo for a specific user
   * @param userId - The ID of the user
   * @param todo - The todo object with updated data
   * @returns Observable with the result of the update
   */
  updateTodo(userId: string, todo: todos): Observable<void> {
    const docRef = doc(this._Firestore, `users/${userId}/todos/${todo.ID}`);
    const promise = setDoc(docRef, todo);
    return this.wrapper.wrapRequest(promise);
  }
}
