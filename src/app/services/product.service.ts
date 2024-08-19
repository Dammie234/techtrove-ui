import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  index(){
    return this.http.get('https://api.nascotradings.com/api/products', {withCredentials: true})
  }

  show(id: any){
    return this.http.get(`https://api.nascotradings.com/api/products/${id}`, {withCredentials: true})
  }

  store(inputData: any){
    return this.http.post('https://api.nascotradings.com/api/products', inputData, {withCredentials: true})
  }

  update(inputData: any, id: any){
    return this.http.patch(`https://api.nascotradings.com/api/products/${id}`, inputData, {withCredentials: true})
  }

  destroy(id: any){
    return this.http.delete(`https://api.nascotradings.com/api/products/${id}`, {withCredentials: true})
  }
}
