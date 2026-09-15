import { Component, computed, inject } from '@angular/core';
import { StickyService } from '../sticky-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { StickyNoteInterface } from '../sticky-note-interface';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-note-list',
  styleUrl: './note-list.css',
  templateUrl: './note-list.html',
})
export class NoteList {
  private noteService = inject(StickyService);
  notes = toSignal(this.noteService.getNotes(), { initialValue: [] as StickyNoteInterface[] });

  openNoteCount = computed(() => this.notes().filter((n) => !n.completed).length);
  totalNoteCount = computed(() => this.notes().length);

  async delete(id: string) {
    if (!confirm('Delete this note>')) return;
    await this.noteService.deleteNote(id);
  }
}
