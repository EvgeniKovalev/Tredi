import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Requestor } from './requestor';
import { Router } from '@angular/router';
import { Attribute } from '../models/Attribute';

@Injectable({
  providedIn: 'root',
})
export class PimService {
  constructor(private http: HttpClient) {}

  LoadAttributes() {
    return this.http.get<Attribute[]>(
      environment.apiUrl + '/Pim/LoadAttributes',
      {
        withCredentials: true,
      }
    );
  }

  AddAttribute(attributeModel: Attribute) {
    return this.http.post<string>(
      environment.apiUrl + '/Pim/AddAttribute',
      attributeModel,
      {
        withCredentials: true,
      }
    );
  }
}
