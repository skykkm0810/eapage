import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsageRuleComponent } from './usage-rule.component';

describe('UsageRuleComponent', () => {
  let component: UsageRuleComponent;
  let fixture: ComponentFixture<UsageRuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsageRuleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsageRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
