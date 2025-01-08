import { inject, Injectable } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { todos } from '../Interfaces/todos';

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
}
