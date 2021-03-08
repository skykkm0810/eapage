import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RqstCompanyClassComponent } from './rqst-company-class.component';

describe('RqstCompanyClassComponent', () => {
  let component: RqstCompanyClassComponent;
  let fixture: ComponentFixture<RqstCompanyClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RqstCompanyClassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RqstCompanyClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
