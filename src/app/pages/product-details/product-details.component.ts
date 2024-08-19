import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FrontendService } from '../../services/frontend.service';
import { CartService } from '../../services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  slug: any;
  product: any;
  carts: any = [];
  quantity: number = 1;
  constructor(
    private route: ActivatedRoute,
    private frontendService: FrontendService,
    private cartService: CartService,
    private toast: ToastrService
  ) {}
  ngOnInit(): void {
    this.getCarts();
    this.slug = this.route.snapshot.paramMap.get('slug');
    this.getProduct();
  }

  getProduct() {
    this.frontendService.productDetails(this.slug).subscribe((res: any) => {
      this.product = res;
    });
  }

  getCarts() {
    this.cartService.carts().subscribe((res: any) => {
      this.carts = res;
    });
  }

  incrementQty() {
    return this.quantity++;
  }
  decrementQty() {
    return this.quantity--;
  }
  addProductToCart(pid: number, qty: number) {
    this.cartService.addProductToCart(pid, qty).subscribe({
      next: (res: any) => {
        this.toast.success(res.message, 'Success!');
        this.getCarts()
      },
      error: (err: any) => {
        this.toast.error(err.error.message, 'Error!');
        window.location.reload();
      },
    });
  }
}
