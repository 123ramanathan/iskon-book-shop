import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StockReceiptPage } from './stock-receipt.page';

describe('StockReceiptPage', () => {
  let component: StockReceiptPage;
  let fixture: ComponentFixture<StockReceiptPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StockReceiptPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
