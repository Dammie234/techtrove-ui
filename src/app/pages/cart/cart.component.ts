import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  carts: any = [];
  loading: boolean = true;
  shipping: any = 0
  constructor(private cartService: CartService, private toast: ToastrService) {}
  ngOnInit(): void {
    this.getCarts();
  }

  getCarts() {
    this.cartService.carts().subscribe((res: any) => {
      this.carts = res;
      this.loading = false;
    });
  }

  subTotal() {
    let total = 0;
    for (let index = 0; index < this.carts.length; index++) {
      total += this.carts[index].sub_total;
    }
    return total;
  }

  computeTotal(){
   return this.subTotal() +  parseInt(this.shipping)
  }

  removeFromCart(pid: number) {
    this.cartService.removeCart(pid).subscribe((res: any) => {
      this.toast.success(res.message, 'Success!');
      this.getCarts();
    });
  }

  incrementQty(pid: number) {
    this.cartService.incrementCart(pid).subscribe((res: any) => {
      this.toast.success(res.message, 'Success!');
      this.getCarts();
    });
  }

  decrementQty(pid: number) {
    this.cartService.decrementCart(pid).subscribe((res: any) => {
      this.toast.success(res.message, 'Success!');
      this.getCarts();
    });
  }
}
