import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';
import { CategoryService } from '../../../../services/category.service';
import { ToastrService } from 'ngx-toastr';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ProductService } from '../../../../services/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css',
})
export class CreateProductComponent implements OnInit {
  user: any;
  categories: any = [];

  category!: any;
  name!: string;
  short_description!: string;
  description!: string;
  price!: number;
  sales_price!: number;
  qty!: number;
  sku!: string;
  featured!: any;
  additional_information!: string;
  url: any;
  msg: string = '';

  errors: any = [];

  loading: boolean = false;
  loadingTitle: string = 'Adding Product';

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' },
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],

    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [['bold', 'italic'], ['fontSize']],
  };
  constructor(
    private authService: AuthService,
    private router: Router,
    private categoryService: CategoryService,
    private toast: ToastrService,
    private productService: ProductService
  ) {}
  ngOnInit(): void {
    this.getUser();
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
    });
  }

  selectFile(event: any) {
    if (!event.target.files[0] || event.target.files[0].length == 0) {
      this.msg = 'You must select an image';
      this.toast.error(this.msg, 'Error!');
      return;
    }

    var mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      this.msg = 'Only images are supported';
      this.toast.error(this.msg, 'Error!');
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (_event) => {
      this.msg = '';
      this.url = reader.result;
      this.toast.success('Image successfully selected', 'Success!');
    };
  }

  submit() {
    this.loading = true;
    let inputData = {
      category: this.category,
      name: this.name,
      sku: this.sku,
      price: this.price,
      featured: this.featured,
      sales_price: this.sales_price,
      qty: this.qty,
      short_description: this.short_description,
      description: this.description,
      additional_information: this.additional_information,
      image: this.url,
    };
    this.productService.store(inputData).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.toast.success(res.message, 'Success');
        this.router.navigate(['/account/products']);
      },
      error: (err: any) => {
        this.loading = false;
        this.errors = err.error.errors;
      },
    });
  }
}
