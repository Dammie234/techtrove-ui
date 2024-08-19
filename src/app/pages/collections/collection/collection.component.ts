import { Component, OnInit } from '@angular/core';
import { FrontendService } from '../../../services/frontend.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrl: './collection.component.css',
})
export class CollectionComponent implements OnInit {
  slug: any;
  data: any = {};
  carts: any = [];
  loading: boolean = true;
  loadingTitle: string = 'Loading Products';
  itemsPerPage = 21;
  currentPage = 1;

  constructor(
    private frontendService: FrontendService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private toast: ToastrService
  ) {}
  ngOnInit(): void {
    this.getCarts();
    this.slug = this.route.snapshot.paramMap.get('slug');
    this.getProducts();
  }

  getProducts() {
    this.frontendService.categoryProducts(this.slug).subscribe((res: any) => {
      this.data = res;
      this.loading = false;
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
    return this.data.products.slice(start, end);
  }
  changePage(page: number) {
    this.currentPage = page;
  }
}
