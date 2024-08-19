import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FrontendService {
  constructor(private http: HttpClient) {}

  products() {
    return this.http.get('https://api.nascotradings.com/api/frontend-products');
  }

  categoryProducts(slug: any) {
    return this.http.get(`https://api.nascotradings.com/api/category-products/${slug}`);
  }

  productDetails(slug: any) {
    return this.http.get(`https://api.nascotradings.com/api/product-details/${slug}`);
  }

  searchProducts(search: any) {
    return this.http.get(`https://api.nascotradings.com/api/search-products/${search}`);
  }

  newProducts() {
    return this.http.get('https://api.nascotradings.com/api/new-products');
  }

  featuredProducts() {
    return this.http.get('https://api.nascotradings.com/api/featured-products');
  }
}
