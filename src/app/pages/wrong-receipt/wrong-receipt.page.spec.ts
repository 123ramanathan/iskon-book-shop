import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WrongReceiptPage } from './wrong-receipt.page';

describe('WrongReceiptPage', () => {
  let component: WrongReceiptPage;
  let fixture: ComponentFixture<WrongReceiptPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(WrongReceiptPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
