import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RqstPersonalClassComponent } from './rqst-personal-class.component';

describe('RqstPersonalClassComponent', () => {
  let component: RqstPersonalClassComponent;
  let fixture: ComponentFixture<RqstPersonalClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RqstPersonalClassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RqstPersonalClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
