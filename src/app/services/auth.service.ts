import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(inputData: any){
    return this.http.post('https://api.nascotradings.com/api/login', inputData, {withCredentials: true})
  }

  logout(){
    return this.http.post('https://api.nascotradings.com/api/logout', {}, {withCredentials: true})
  }

  user(){
    return this.http.get('https://api.nascotradings.com/api/user', {withCredentials: true})
  }
}
