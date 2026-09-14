import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoteCreate } from './note-create';

describe('NoteCreate', () => {
  let component: NoteCreate;
  let fixture: ComponentFixture<NoteCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoteCreate],
    }).compileComponents();

    fixture = TestBed.createComponent(NoteCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
