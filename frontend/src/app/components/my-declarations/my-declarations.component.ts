import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MyVehiclesService } from 'src/app/services/my-vehicles/my-vehicles.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-my-declarations',
  templateUrl: './my-declarations.component.html',
  styleUrls: ['./my-declarations.component.scss'],
})
export class MyDeclarationsComponent implements OnInit {
  pdfList!: string[];
  cars!: any[];

  totalItems!: number;
  pageIndex: number = 0;
  pageSize: number = 10;

  constructor(
    private http: HttpClient,
    private carService: MyVehiclesService
  ) {}

  ngOnInit() {
    this.loadCars();
  }

  getPDFList() {
    this.http
      .get<any>('http://127.0.0.1:8000/api/declaration-list')
      .subscribe((data) => {
        this.pdfList = data.pdf_list.filter((pdfName: any) => {
          for (const car of this.cars) {
            if (pdfName.name.includes(car.license_plate)) {
              return true;
            }
          }
          return false;
        });
        console.log(this.pdfList);
      });
  }

  loadCars() {
    this.carService.getCars().subscribe((cars) => {
      this.cars = cars;
      this.getPDFList();
    });
  }

  pageChanged(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }
}
