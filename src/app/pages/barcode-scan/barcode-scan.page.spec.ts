import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BarcodeScanPage } from './barcode-scan.page';

describe('BarcodeScanPage', () => {
  let component: BarcodeScanPage;
  let fixture: ComponentFixture<BarcodeScanPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BarcodeScanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
