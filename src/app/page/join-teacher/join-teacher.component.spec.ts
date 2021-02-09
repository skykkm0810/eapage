import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinTeacherComponent } from './join-teacher.component';

describe('JoinTeacherComponent', () => {
  let component: JoinTeacherComponent;
  let fixture: ComponentFixture<JoinTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinTeacherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
