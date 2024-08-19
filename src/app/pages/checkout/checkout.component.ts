import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { BillingService } from '../../services/billing.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  carts: any = [];
  shipping: any = 0;
  errors: any = {};
  total = 0;

  firstname!: string;
  lastname!: string;
  company_name!: string;
  country!: string;
  street_address!: string;
  city!: string;
  state!: string;
  postal_code!: string;
  phone!: string;
  email!: string;
  password!: string;
  account!: string;
  notes!: string;
  agree: boolean = false;
  key: any;

  url: any;
  msg: string = '';
  loading: boolean = false;

  user: any;

  constructor(
    private cartService: CartService,
    private toast: ToastrService,
    private cookieService: CookieService,
    private billingService: BillingService,
    private authService: AuthService, private router: Router
  ) {}
  ngOnInit(): void {
    this.getCarts();
    this.getUser()
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
    this.total = total;
    return total;
  }

  computeTotal() {
    return this.subTotal() + parseInt(this.shipping);
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

  getUser() {
    this.authService.user().subscribe(
      (res: any) => {
        this.user = res;
      }
    );
  }

  submit() {
    this.loading = true
    let inputData = {
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      company_name: this.company_name,
      country: this.country,
      city: this.city,
      postal_code: this.postal_code,
      phone: this.phone,
      payment_type: 'Direct Transfer',
      payment_image: this.url,
      delivery_fee: this.shipping,
      notes: this.notes,
      password: this.password,
      state: this.state,
      street_address: this.street_address,
      total: this.total,
      key: this.cookieService.get('key'),
    };
    this.billingService.placeOrder(inputData).subscribe({
      next: (res: any) => {
        this.loading = false
        this.cookieService.delete('key', '/', 'localhost', false, 'Lax');
        this.toast.success(res.message, 'Success!');
        if (this.user) {
          this.router.navigate(['/account/dashboard']);
        } else if(this.password) {
          this.router.navigate(['/auth/login']);
        }else{
          this.router.navigate(['/shop'])
        }
      },
      error: (err: any) => {
        this.loading = false
        this.errors  = err.error.errors
      },
    });
  }
}
