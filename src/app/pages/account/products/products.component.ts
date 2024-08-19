import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  user: any;
  products: any = [];
  loading: boolean = true;
  loadingTitle: string = 'Loading Products';
  constructor(private authService: AuthService, private router: Router, private productService: ProductService) {}
  ngOnInit(): void {
    this.getUser()
    this.getProducts()
  }

  getUser() {
    this.authService.user().subscribe(
      (res: any) => {
        this.user = res;
      },
      (err: any) => {
        this.router.navigate(['/auth/login']);
      }
    );
  }

  getProducts(){

    this.productService.index().subscribe((res: any) => {
      this.products = res
      this.loading = false
    })
  }
}
