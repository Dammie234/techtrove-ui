import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BillingService {

  constructor(private http: HttpClient) { }

  placeOrder(inputData: any){
    return this.http.post('https://api.nascotradings.com/api/place-order', inputData)
  }

  index(){
    return this.http.get('https://api.nascotradings.com/api/billings', {withCredentials: true})
  }

  show(id: any){
    return this.http.get(`https://api.nascotradings.com/api/billings/${id}`, {withCredentials:true})
  }

  orders(id: any){
    return this.http.get(`https://api.nascotradings.com/api/orders/${id}`, {withCredentials: true})
  }

  approveBilling(id: any){
    return this.http.get(`https://api.nascotradings.com/api/approve-billing/${id}`, {withCredentials: true})
  }

  myBillings(){
    return this.http.get('https://api.nascotradings.com/api/my-billings', {withCredentials: true});
  }
}
