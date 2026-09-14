import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StickyService } from '../sticky-service';
import { NewNote } from '../sticky-note-interface';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-note-create',
  styleUrl: './note-create.css',
  templateUrl: './note-create.html',
})
export class NoteCreate {
  private noteService = inject(StickyService);

  taskForm = new FormGroup({
    title: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3)],
      nonNullable: true,
    }),
    details: new FormControl('', { validators: Validators.required, nonNullable: true }),
    colour: new FormControl('', { validators: Validators.required, nonNullable: true }),
  });

  async onSubmit() {
    console.log('componet has recevied', this.taskForm.value);

    if (this.taskForm.invalid) return;

    const newNote: NewNote = {
      ...this.taskForm.getRawValue(),
      completed: false,
      createdOn: Date.now(),
    };

    console.log('Compoenent sending:', newNote);

    await this.noteService.addNote(newNote);
  }
}
