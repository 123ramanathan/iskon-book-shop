import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransferReceiptPage } from './transfer-receipt.page';

describe('TransferReceiptPage', () => {
  let component: TransferReceiptPage;
  let fixture: ComponentFixture<TransferReceiptPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferReceiptPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
