import { inject, Service } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  query,
  orderBy,
  collectionData,
} from '@angular/fire/firestore';
import { NewNote, StickyNoteInterface } from './sticky-note-interface';
import { Observable } from 'rxjs';

@Service()
export class StickyService {
  private firestore = inject(Firestore);
  private noteColl = collection(this.firestore, 'tasks');

  addNote(note: NewNote) {
    return addDoc(this.noteColl, note);
  }

  getNotes(): Observable<StickyNoteInterface[]> {
    const q = query(this.noteColl, orderBy('createdOn', 'desc'));
    return collectionData(q, { idField: 'id' }) as Observable<StickyNoteInterface[]>;
  }

  deleteNote(id: string){
    console.log('SERVICE deleting:', id)
  }
}
