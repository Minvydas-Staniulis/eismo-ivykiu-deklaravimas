import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MyVehiclesService {
  private baseUrl = 'http://127.0.0.1:8000/api/';

  constructor(private http: HttpClient) {}

  createCar(make: string, model: string, year: number, license_plate: string) {
    const url = this.baseUrl + 'cars/create/';
    const token = localStorage.getItem('token');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      }),
    };

    const body = {
      make: make,
      model: model,
      year: year,
      license_plate: license_plate,
    };

    return this.http.post(url, body, httpOptions);
  }

  getMakes() {
    const url = this.baseUrl + 'car-makes/';
    return this.http.get<any[]>(url);
  }

  getModels(makeId: number) {
    const url = this.baseUrl + `car-models/?make_id=${makeId}`;
    return this.http.get<any[]>(url);
  }
}
