import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  index(){
    return this.http.get('https://api.nascotradings.com/api/categories')
  }

  fewCategories(){
    return this.http.get('https://api.nascotradings.com/api/few-categories')
  }

  show(id: any){
    return this.http.get(`https://api.nascotradings.com/api/categories/${id}`, {withCredentials: true})
  }

  store(inputData: any){
    return this.http.post('https://api.nascotradings.com/api/categories', inputData, {withCredentials: true})
  }

  update(id: any, inputData: any){
    return this.http.patch(`https://api.nascotradings.com/api/categories/${id}`, inputData, {withCredentials: true})
  }
}
