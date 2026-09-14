export interface StickyNoteInterface {
  id: string;
  title: string;
  details: string;
  colour: string;
  completed: boolean;
  createdOn: number;
}

export type NewNote = Omit<StickyNoteInterface, 'id'>;
