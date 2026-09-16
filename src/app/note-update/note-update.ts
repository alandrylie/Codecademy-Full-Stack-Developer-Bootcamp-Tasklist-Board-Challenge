import { Component, computed, effect, inject } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap } from 'rxjs';
import { StickyService } from '../sticky-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-note-update',
  styleUrl: './note-update.css',
  templateUrl: './note-update.html',
})
export class NoteUpdate {
  private route = inject(ActivatedRoute);
  private params = toSignal(this.route.paramMap);
  private noteService = inject(StickyService);
  private router = inject(Router);
  noteId = computed(() => this.params()?.get('id') ?? '');
  noteColour = computed( () => this.note()?.colour);

  updateForm = new FormGroup({
    title: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3), Validators.maxLength(15)],
      nonNullable: true,
    }),
    details: new FormControl('', {
      validators: [Validators.required, Validators.maxLength(200)],
      nonNullable: true,
    }),
    colour: new FormControl('', { validators: Validators.required, nonNullable: true }),
  });

  constructor() {
    effect(() => {
      const n = this.note();
      if (!n) return;
      this.updateForm.patchValue({
        title: n.title,
        details: n.details,
        colour: n.colour,
      });
    });
  }

  private note$ = toObservable(this.noteId).pipe(
    filter((id): id is string => id !== ''),
    switchMap((id) => this.noteService.getNote(id)),
  );

  note = toSignal(this.note$);

  async onSubmit() {
    if (this.updateForm.invalid) return;
    await this.noteService.updateNote(this.noteId(), this.updateForm.getRawValue());
    this.updateForm.reset();
    this.router.navigate(['/notes']);
  }
}
