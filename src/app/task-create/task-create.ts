import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-task-create',
  styleUrl: './task-create.css',
  templateUrl: './task-create.html',
})
export class TaskCreate {
 

  taskForm = new FormGroup({
    title: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3)],
      nonNullable: true,
    }),
    details: new FormControl('', { validators: Validators.required, nonNullable: true }),
    colour: new FormControl('', { validators: Validators.required, nonNullable: true }),
  });

  onSubmit(){

    console.log(this.taskForm.value)
  }
}
