import { Component, computed, effect, inject } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { filter, switchMap } from 'rxjs';
import { StickyService } from '../sticky-service';

@Component({
  imports: [],
  selector: 'app-note-update',
  styleUrl: './note-update.css',
  templateUrl: './note-update.html',
})
export class NoteUpdate {
  private route = inject(ActivatedRoute);
  private params = toSignal(this.route.paramMap);
  private noteService = inject(StickyService)
  noteId = computed( () => this.params()?.get('id') ?? '');

  constructor(){
    effect( () => console.log('UPDATINGid:', this.noteId()))
  }

  private note$ = toObservable(this.noteId).pipe(
    filter((id): id is string => id !== ''),
    switchMap(id => this.noteService.getNote(id))
  )

  note = toSignal(this.note$);
}
