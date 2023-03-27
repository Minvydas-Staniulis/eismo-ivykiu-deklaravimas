import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MyVehiclesService } from 'src/app/services/my-vehicles/my-vehicles.service';
import { MyVehiclesDialogComponent } from './my-vehicles-dialog/my-vehicles-dialog/my-vehicles-dialog.component';

@Component({
  selector: 'app-my-vehicles',
  templateUrl: './my-vehicles.component.html',
  styleUrls: ['./my-vehicles.component.scss'],
})
export class MyVehiclesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'make', 'model', 'year', 'license_plate'];
  cars!: any[];

  constructor(
    public dialog: MatDialog,
    private carService: MyVehiclesService
  ) {}

  ngOnInit(): void {
    this.loadCars();
  }

  openDialog() {
    const dialogRef = this.dialog.open(MyVehiclesDialogComponent);

    dialogRef.afterClosed().subscribe();
  }

  loadCars() {
    this.carService.getCars().subscribe((cars) => {
      this.cars = cars;
    });
  }
}
