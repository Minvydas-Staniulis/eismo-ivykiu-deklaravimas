import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicensePlateDialogComponent } from './license-plate-dialog.component';

describe('LicensePlateDialogComponent', () => {
  let component: LicensePlateDialogComponent;
  let fixture: ComponentFixture<LicensePlateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LicensePlateDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LicensePlateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
