import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StickyService } from '../sticky-service';
import { NewNote } from '../sticky-note-interface';
import { Router } from '@angular/router';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-note-create',
  styleUrl: './note-create.css',
  templateUrl: './note-create.html',
})
export class NoteCreate {
  private noteService = inject(StickyService);
  private router = inject(Router)

  noteForm = new FormGroup({
    title: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3), Validators.maxLength(15)],
      nonNullable: true,
    }),
    details: new FormControl('', { validators: [Validators.required, Validators.maxLength(200)], nonNullable: true }),
    colour: new FormControl('', { validators: Validators.required, nonNullable: true }),
  });

  async onSubmit() {
    if (this.noteForm.invalid) return;

    const newNote: NewNote = {
      ...this.noteForm.getRawValue(),
      completed: false,
      createdOn: Date.now(),
    };
   
    await this.noteService.addNote(newNote);
    this.noteForm.reset();
    this.router.navigate(['/notes']);
  }
}
