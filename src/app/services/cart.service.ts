import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  key!: string;

  constructor(private cookieService: CookieService, private http: HttpClient) {}

  generateString() {
    let result = '';
    let length = 20;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }
  addToCart(pid: number) {
    if (this.cookieService.get('key')) {
      this.key = this.cookieService.get('key');
    } else {
      this.key = this.generateString();
      const dateNow = new Date();
      dateNow.setHours(dateNow.getHours() + 24);
      this.cookieService.set('key', this.key, dateNow); //cookie for 1 day
    }

    return this.http.get(
      `https://api.nascotradings.com/api/add-to-cart/${pid}/${this.key}`
    );
  }
  addProductToCart(pid: number, qty: number) {
    if (this.cookieService.get('key')) {
      this.key = this.cookieService.get('key');
    } else {
      this.key = this.generateString();
      const dateNow = new Date();
      dateNow.setHours(dateNow.getHours() + 24);
      this.cookieService.set('key', this.key, dateNow); //cookie for 1 day
    }

    return this.http.get(
      `https://api.nascotradings.com/api/add-product-to-cart/${pid}/${qty}/${this.key}`
    );
  }
  carts() {
    this.key = this.cookieService.get('key');
    return this.http.get(
      `https://api.nascotradings.com/api/carts/${this.key}`
    );
  }
  removeCart(pid: number) {
    this.key = this.cookieService.get('key');
    return this.http.get(
      `https://api.nascotradings.com/api/remove-from-cart/${pid}/${this.key}`
    );
  }
  incrementCart(pid: number) {
    this.key = this.cookieService.get('key');
    return this.http.get(
      `https://api.nascotradings.com/api/increment-cart/${pid}/${this.key}`
    );
  }
  decrementCart(pid: number) {
    this.key = this.cookieService.get('key');
    return this.http.get(
      `https://api.nascotradings.com/api/decrement-cart/${pid}/${this.key}`
    );
  }
}
