import { Routes } from '@angular/router';
import { TaskList } from './task-list/task-list';
import { TaskCreate } from './task-create/task-create';
import { TaskUpdate } from './task-update/task-update';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full',
  },
  {
    path: 'tasks',
    component: TaskList,
  },
  {
    path: 'tasks/new',
    component: TaskCreate,
  },
  {
    path: 'tasks/:id/update',
    component: TaskUpdate,
  },
  {
    path: '**',
    redirectTo: 'tasks',
  },
];
