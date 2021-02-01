import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaumdociComponent } from './maumdoci.component';

describe('MaumdociComponent', () => {
  let component: MaumdociComponent;
  let fixture: ComponentFixture<MaumdociComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaumdociComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaumdociComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
