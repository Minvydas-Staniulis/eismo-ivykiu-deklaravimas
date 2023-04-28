import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MyVehiclesService } from 'src/app/services/my-vehicles/my-vehicles.service';

@Component({
  selector: 'app-license-plate-dialog',
  templateUrl: './license-plate-dialog.component.html',
  styleUrls: ['./license-plate-dialog.component.scss'],
})
export class LicensePlateDialogComponent implements OnInit {
  cars!: any[];

  constructor(
    private carService: MyVehiclesService,
    public dialogRef: MatDialogRef<LicensePlateDialogComponent>
  ) {}

  ngOnInit() {
    this.loadCars();
  }

  loadCars() {
    this.carService.getCars().subscribe((cars) => {
      this.cars = cars;
    });
  }

  selectPlate(plate: string) {
    this.dialogRef.close(plate);
  }
}
