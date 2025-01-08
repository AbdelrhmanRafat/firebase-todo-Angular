import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private firestore = inject(Firestore);
  private todosCollection = collection(this.firestore, 'todos');

  getTodos(): Observable<any[]> { // Use any[] for now for simplicity
    return collectionData(this.todosCollection, { idField: 'id' });
  }
}