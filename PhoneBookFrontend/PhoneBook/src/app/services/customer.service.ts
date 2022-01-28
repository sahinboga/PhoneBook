import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RootURL } from '../components/constants';
import { Customer } from '../models/customer';
import { DataResponseModel } from '../models/dataResponseMode';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiUrl = RootURL + "/Customers"
  constructor(private httpClient:HttpClient) { }

  getCustomers(): Observable<DataResponseModel<Customer[]>> {
    return this.httpClient.get<DataResponseModel<Customer[]>>(this.apiUrl + "/getallcustomers");
  }

  add(customer:Customer):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"/addcustomer",customer);
  }
}
