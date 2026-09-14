import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoteUpdate } from './note-update';

describe('NoteUpdate', () => {
  let component: NoteUpdate;
  let fixture: ComponentFixture<NoteUpdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoteUpdate],
    }).compileComponents();

    fixture = TestBed.createComponent(NoteUpdate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
