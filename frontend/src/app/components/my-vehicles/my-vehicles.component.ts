import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MyVehiclesDialogComponent } from './my-vehicles-dialog/my-vehicles-dialog/my-vehicles-dialog.component';

@Component({
  selector: 'app-my-vehicles',
  templateUrl: './my-vehicles.component.html',
  styleUrls: ['./my-vehicles.component.scss'],
})
export class MyVehiclesComponent {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(MyVehiclesDialogComponent);

    dialogRef.afterClosed().subscribe();
  }
}
