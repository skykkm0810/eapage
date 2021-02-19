import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LectureInfoListComponent } from './lecture-info-list.component';

describe('LectureInfoListComponent', () => {
  let component: LectureInfoListComponent;
  let fixture: ComponentFixture<LectureInfoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LectureInfoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LectureInfoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
