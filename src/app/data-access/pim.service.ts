import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Requestor } from './requestor';
import { Router } from '@angular/router';
import { Attribute } from '../models/Attribute';
import { Product } from '../models/Product';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PimService {
  private requestor = new Requestor<any>();
  private attributeSource = new BehaviorSubject<Attribute[]>({} as Attribute[]);
  public allAttributes = this.attributeSource.asObservable();

  constructor(private http: HttpClient) {
    this.ReloadAttributes();
  }

  /*** ATTRIBUTES */
  ReloadAttributes() {
    this.requestor
      .load(
        this.http.get<Attribute[]>(environment.apiUrl + '/Pim/LoadAttributes', {
          withCredentials: true,
        })
      )
      .then((result) => {
        if (!this.requestor.hasError) {
          this.attributeSource.next(result);
        }
      });
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

  EditAttribute(attributeModel: Attribute) {
    return this.http.post<string>(
      environment.apiUrl + '/Pim/EditAttribute',
      attributeModel,
      {
        withCredentials: true,
      }
    );
  }

  DeleteAttribute(attributeModel: Attribute) {
    return this.http.post<string>(
      environment.apiUrl + '/Pim/DeleteAttribute',
      attributeModel,
      {
        withCredentials: true,
      }
    );
  }

  /***PRODUCTS */
  LoadProducts() {
    return this.http.get<Product[]>(environment.apiUrl + '/Pim/LoadProducts', {
      withCredentials: true,
    });
  }

  AddProduct(productModel: Product) {
    return this.http.post<string>(
      environment.apiUrl + '/Pim/AddProduct',
      productModel,
      {
        withCredentials: true,
      }
    );
  }

  EditProduct(productModel: Product) {
    return this.http.post<string>(
      environment.apiUrl + '/Pim/EditProduct',
      productModel,
      {
        withCredentials: true,
      }
    );
  }

  DeleteProduct(productModel: Product) {
    return this.http.post<string>(
      environment.apiUrl + '/Pim/DeleteProduct',
      productModel,
      {
        withCredentials: true,
      }
    );
  }
}
