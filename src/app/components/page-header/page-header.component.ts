import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.css',
})
export class PageHeaderComponent implements OnInit {
  constructor(private cartService: CartService, private toast: ToastrService, private categoryService: CategoryService) {}
  @Input()
  carts: any = [];
  searchText: any = ''
  categories: any = []


  ngOnInit(): void {
      this.getCategories()
  }
  getCarts() {
    this.cartService.carts().subscribe((res: any) => {
      this.carts = res;
    });
  }

  subTotal() {
    let total = 0;
    for (let index = 0; index < this.carts.length; index++) {
      total += this.carts[index].sub_total;
    }
    return total;
  }

  getCategories(){
    this.categoryService.index().subscribe((res: any) => {
      this.categories = res
    })
  }

  removeFromCart(pid: number) {
    this.cartService.removeCart(pid).subscribe((res: any) => {
      this.toast.success(res.message, 'Success!');
      this.getCarts();
    });
  }

  searchProducts(){
    window.location.href = '/search-products/' + this.searchText;
  }
}
