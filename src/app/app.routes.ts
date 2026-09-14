import { Routes } from '@angular/router';

import { NoteCreate } from './note-create/note-create';
import { NoteList } from './note-list/note-list';
import { NoteUpdate } from './note-update/note-update';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'notes',
    pathMatch: 'full',
  },
  {
    path: 'notes',
    component: NoteList,
  },
  {
    path: 'notes/new',
    component: NoteCreate,
  },
  {
    path: 'notes/:id/update',
    component: NoteUpdate,
  },
  {
    path: '**',
    redirectTo: 'notes',
  },
];
