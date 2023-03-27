import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyVehiclesDialogComponent } from './my-vehicles-dialog.component';

describe('MyVehiclesDialogComponent', () => {
  let component: MyVehiclesDialogComponent;
  let fixture: ComponentFixture<MyVehiclesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyVehiclesDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyVehiclesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
