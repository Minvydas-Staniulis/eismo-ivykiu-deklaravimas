import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyVehiclesService } from 'src/app/services/my-vehicles/my-vehicles.service';

@Component({
  selector: 'app-my-vehicles-dialog',
  templateUrl: './my-vehicles-dialog.component.html',
  styleUrls: ['./my-vehicles-dialog.component.scss'],
})
export class MyVehiclesDialogComponent implements OnInit {
  carMakes!: any[];
  carModels!: any[];

  carForm!: FormGroup;

  get selectedMakeId() {
    const control = this.carForm.get('makeId');
    return control ? control.value : null;
  }

  get selectedModelId() {
    const control = this.carForm.get('modelId');
    return control ? control.value : null;
  }

  get selectedYear() {
    const control = this.carForm.get('year');
    return control ? control.value : null;
  }

  get selectedLicensePlate() {
    const control = this.carForm.get('licensePlate');
    return control ? control.value : null;
  }

  constructor(private carService: MyVehiclesService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.carForm = this.fb.group({
      makeId: ['', Validators.required],
      modelId: ['', Validators.required],
      year: [
        '',
        [Validators.required, Validators.min(1886), Validators.max(2023)],
      ],
      licensePlate: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*[0-9]|EV[0-9]{4})[A-Z0-9]{1,6}$/),
        ],
      ],
    });

    this.loadMakes();
  }

  loadMakes() {
    this.carService
      .getMakes()
      .subscribe((carMakes) => (this.carMakes = carMakes));
  }

  loadModels() {
    this.carService.getModels(this.selectedMakeId).subscribe((models) => {
      this.carModels = models;
    });
  }

  createCar() {
    const selectedMake = this.carMakes.find(
      (make) => make.id === this.selectedMakeId
    );
    const selectedMakeName = selectedMake?.name;

    const selectedModel = this.carModels.find(
      (model) => model.id === this.selectedModelId
    );
    const selectedModelName = selectedModel?.name;

    this.carService.createCar(
      selectedMakeName,
      selectedModelName,
      this.selectedYear,
      this.selectedLicensePlate
    );
  }

  onInput(event: any) {
    event.target.value = event.target.value.toUpperCase();
  }
}
