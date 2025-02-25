import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewQuestionModalComponent } from './new-question-modal.component';

describe('NewQuestionModalComponent', () => {
  let component: NewQuestionModalComponent;
  let fixture: ComponentFixture<NewQuestionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewQuestionModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewQuestionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
