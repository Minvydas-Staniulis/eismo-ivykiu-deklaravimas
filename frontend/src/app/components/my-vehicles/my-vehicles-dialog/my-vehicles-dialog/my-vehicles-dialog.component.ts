import { Component, OnInit } from '@angular/core';
import { MyVehiclesService } from 'src/app/services/my-vehicles/my-vehicles.service';

@Component({
  selector: 'app-my-vehicles-dialog',
  templateUrl: './my-vehicles-dialog.component.html',
  styleUrls: ['./my-vehicles-dialog.component.scss'],
})
export class MyVehiclesDialogComponent implements OnInit {
  carMakes!: any[];
  carModels!: any[];
  selectedMake!: number;
  selectedModel!: number;

  constructor(private carService: MyVehiclesService) {}

  ngOnInit(): void {
    this.loadMakes();
  }

  loadMakes() {
    this.carService
      .getMakes()
      .subscribe((carMakes) => (this.carMakes = carMakes));
  }

  loadModels() {
    this.carService.getModels(this.selectedMake).subscribe((models) => {
      this.carModels = models;
    });
  }
}
