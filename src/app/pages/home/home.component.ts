import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CategoryService } from '../../services/category.service';
import { FrontendService } from '../../services/frontend.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  carts: any = [];
  categories: any = [];
  new_products: any = [];
  featured_products: any = [];
  constructor(
    private cartService: CartService,
    private categoryService: CategoryService,
    private frontendService: FrontendService,
    private toast: ToastrService
  ) {}
  ngOnInit(): void {
    this.getCarts();
    this.getCategories();
    this.getNewProducts();
    this.getFeaturedProducts();
  }

  getCarts() {
    this.cartService.carts().subscribe((res: any) => {
      this.carts = res;
    });
  }

  addToCart(id: number) {
    this.cartService.addToCart(id).subscribe((res: any) => {
      this.toast.success(res.message, 'Success');
      this.getCarts();
    });
  }

  getCategories() {
    this.categoryService.fewCategories().subscribe((res: any) => {
      this.categories = res;
    });
  }

  getNewProducts() {
    this.frontendService.newProducts().subscribe((res: any) => {
      this.new_products = res;
    });
  }

  getFeaturedProducts() {
    this.frontendService.featuredProducts().subscribe((res: any) => {
      this.featured_products = res;
    });
  }
}
