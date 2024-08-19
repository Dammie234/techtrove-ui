import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit {
  categories: any = [];
  loading: boolean = true;
  loadingTitle: string = 'Loading Categories';
  user: any
  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.getUser()
    this.getCategories();
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

  getCategories() {
    this.categoryService.index().subscribe((res: any) => {
      this.categories = res;
      this.loading = false;
    });
  }
}
