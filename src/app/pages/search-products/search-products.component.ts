import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FrontendService } from '../../services/frontend.service';
import { CategoryService } from '../../services/category.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-search-products',
  templateUrl: './search-products.component.html',
  styleUrl: './search-products.component.css',
})
export class SearchProductsComponent implements OnInit {
  products: any = [];
  title: any;
  loading: boolean = true;
  itemsPerPage = 21;
  currentPage = 1;
  categories: any = []
  carts: any = []

  constructor(
    private route: ActivatedRoute,
    private frontendService: FrontendService,
    private categoryService: CategoryService, private toast: ToastrService, private cartService: CartService
  ) {}
  ngOnInit(): void {
    this.title = this.route.snapshot.paramMap.get('title');
    this.getProducts()
    this.getCategories()
    this.getCarts()
  }

  getProducts() {
    this.frontendService.searchProducts(this.title).subscribe((res: any) => {
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
