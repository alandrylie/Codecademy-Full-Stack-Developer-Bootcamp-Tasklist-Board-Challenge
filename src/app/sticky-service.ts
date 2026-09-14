import { inject, Service } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { NewNote } from './sticky-note-interface';

@Service()
export class StickyService {
  private firestore = inject(Firestore);
  private noteColl = collection(this.firestore, 'tasks');

  addNote(note: NewNote){
   
    return addDoc(this.noteColl, note);
  }
}
