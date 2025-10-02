import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StockReconciliationPage } from './stock-reconciliation.page';

describe('StockReconciliationPage', () => {
  let component: StockReconciliationPage;
  let fixture: ComponentFixture<StockReconciliationPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StockReconciliationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
