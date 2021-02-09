import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreopenComponent } from './preopen.component';

describe('PreopenComponent', () => {
  let component: PreopenComponent;
  let fixture: ComponentFixture<PreopenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreopenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreopenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
