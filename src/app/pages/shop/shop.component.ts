import { Component, OnInit } from '@angular/core';
import { FrontendService } from '../../services/frontend.service';
import { CategoryService } from '../../services/category.service';
import { CartService } from '../../services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent implements OnInit {
  products: any = [];
  categories: any = [];
  loading: boolean = true;
  carts: any = [];
  loadingTitle: string = 'Loading Products';
  itemsPerPage = 21;
  currentPage = 1;
  constructor(
    private frontendService: FrontendService,
    private categoryService: CategoryService,
    private cartService: CartService,
    private toast: ToastrService
  ) {}
  ngOnInit(): void {
    this.getCarts();
    this.getCategories();
    this.getProducts();
  }

  getProducts() {
    this.frontendService.products().subscribe((res: any) => {
      this.products = res;
      this.loading = false;
    });
  }

  getCategories() {
    this.categoryService.index().subscribe((res: any) => {
      this.categories = res;
    });
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

  get paginatedData() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.products.slice(start, end);
  }
  changePage(page: number) {
    this.currentPage = page;
  }
}
