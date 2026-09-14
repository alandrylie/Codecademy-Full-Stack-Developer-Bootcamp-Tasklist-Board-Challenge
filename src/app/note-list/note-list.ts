import { Component, computed, inject } from '@angular/core';
import { StickyService } from '../sticky-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { StickyNoteInterface } from '../sticky-note-interface';

@Component({
  imports: [],
  selector: 'app-note-list',
  styleUrl: './note-list.css',
  templateUrl: './note-list.html',
})
export class NoteList {
  private noteService = inject(StickyService);
  notes = toSignal(this.noteService.getNotes(), { initialValue: [] as StickyNoteInterface[] });

  openNoteCount = computed(() => this.notes().filter((n) => !n.completed).length);
  totalNoteCount = computed(() => this.notes().length);
}
