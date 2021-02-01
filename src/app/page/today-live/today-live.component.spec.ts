import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayLiveComponent } from './today-live.component';

describe('TodayLiveComponent', () => {
  let component: TodayLiveComponent;
  let fixture: ComponentFixture<TodayLiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodayLiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodayLiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
