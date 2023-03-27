import { TestBed } from '@angular/core/testing';

import { MyVehiclesService } from './my-vehicles.service';

describe('MyVehiclesServiceService', () => {
  let service: MyVehiclesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyVehiclesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
