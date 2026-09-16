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
  completedCount = computed(() => this.notes().filter((c) => c.completed).length);
  totalNoteCount = computed(() => this.notes().length);
  progress = computed(() => (this.completedCount() / this.totalNoteCount()) * 100);
  progressColour = computed(() => {
    let num: number = this.progress();
    switch (true) {
      case num <= 24:
        return 'red';
      case num <= 49:
        return 'amber';
      case num <= 74:
        return 'yellow';
      default:
        return 'green';
    }
  });

  async delete(id: string) {
    if (!confirm('Delete this note')) return;
    await this.noteService.deleteNote(id);
  }

  async onCompleted(id: string) {
    if (!confirm('Note completed')) return;
    await this.noteService.updateNote(id, { completed: true });
  }

  async onUndo(id: string) {
    if (!confirm('Note completed')) return;
    await this.noteService.updateNote(id, { completed: false });
  }
}
