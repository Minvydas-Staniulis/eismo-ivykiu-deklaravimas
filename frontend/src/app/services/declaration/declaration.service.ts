import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { DeclarationData } from 'src/app/types/types';

@Injectable({
  providedIn: 'root',
})
export class DeclarationService {
  private baseUrl = 'http://127.0.0.1:8000/api/';

  constructor(private http: HttpClient) {}

  sendDeclaration(data: DeclarationData) {
    const url = this.baseUrl + 'declaration-submit';

    const formData = new FormData();
  }
}
