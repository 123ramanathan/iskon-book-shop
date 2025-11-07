import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CloseShiftPage } from './close-shift.page';

describe('CloseShiftPage', () => {
  let component: CloseShiftPage;
  let fixture: ComponentFixture<CloseShiftPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseShiftPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
