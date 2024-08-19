import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../../../services/category.service';
import { ProductService } from '../../../../services/product.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css',
})
export class EditProductComponent implements OnInit {
  user: any;
  categories: any = [];
  id: any

  product: any;
  url: any;
  msg: string = '';

  errors: any = [];

  loading: boolean = false;
  loadingTitle: string = 'Updating Product';

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
    private productService: ProductService, private toast: ToastrService, private route: ActivatedRoute

  ) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')
    this.getUser()
    this.getCategories()
    this.getProduct()
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

  getProduct(){
    this.productService.show(this.id).subscribe((res: any) => {
      this.product = res
    })
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

  submit(){
    this.loading = true
    let inputData = {
      category: this.product.category,
      name: this.product.name,
      sku: this.product.sku,
      price: this.product.price,
      sales_price: this.product.sales_price,
      qty: this.product.qty,
      featured: this.product.featured,
      short_description: this.product.short_description,
      description: this.product.description,
      additional_information: this.product.additional_information,
      image: this.url,
    };
    this.productService.update(inputData, this.id).subscribe({
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
