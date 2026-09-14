import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-note-create',
  styleUrl: './note-create.css',
  templateUrl: './note-create.html',
})
export class NoteCreate {
  taskForm = new FormGroup({
    title: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3)],
      nonNullable: true,
    }),
    details: new FormControl('', { validators: Validators.required, nonNullable: true }),
    colour: new FormControl('', { validators: Validators.required, nonNullable: true }),
  });

  onSubmit() {
    console.log(this.taskForm.value);
  }
}
