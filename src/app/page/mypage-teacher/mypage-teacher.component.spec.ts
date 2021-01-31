import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MypageTeacherComponent } from './mypage-teacher.component';

describe('MypageTeacherComponent', () => {
  let component: MypageTeacherComponent;
  let fixture: ComponentFixture<MypageTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MypageTeacherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MypageTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
