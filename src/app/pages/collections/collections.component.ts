import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrl: './collections.component.css',
})
export class CollectionsComponent implements OnInit {
  categories: any = [];
  loading: boolean = true;
  loadingTitle: string = 'Loading Categories';
  carts: any = [];
  constructor(
    private categoryService: CategoryService,
    private cartService: CartService
  ) {}
  ngOnInit(): void {
    this.getCategories();
    this.getCarts()
  }

  getCategories() {
    this.categoryService.index().subscribe((res: any) => {
      this.categories = res;
      this.loading = false;
    });
  }

  getCarts() {
    this.cartService.carts().subscribe((res: any) => {
      this.carts = res;
    });
  }
}
