import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentOverviewComponent } from './payment-overview.component';

describe('PaymentOverviewComponent', () => {
  let component: PaymentOverviewComponent;
  let fixture: ComponentFixture<PaymentOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentOverviewComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
