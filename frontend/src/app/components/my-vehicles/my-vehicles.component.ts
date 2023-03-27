import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
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

  dataSource!: MatTableDataSource<any>;

  totalItems!: number;
  pageIndex: number = 0;
  pageSize: number = 10;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private carService: MyVehiclesService
  ) {}

  ngOnInit(): void {
    this.loadCars();
  }

  openDialog() {
    const dialogRef = this.dialog.open(MyVehiclesDialogComponent);

    dialogRef.afterClosed().subscribe(() => {
      this.loadCars();
    });
  }

  loadCars() {
    this.carService.getCars().subscribe((cars) => {
      this.dataSource = new MatTableDataSource(cars);
      this.totalItems = cars.length;
      this.dataSource.paginator = this.paginator;
    });
  }

  pageChanged(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }
}
