import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { BillingService } from '../../../../services/billing.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrl: './billing.component.css',
})
export class BillingComponent implements OnInit {
  user: any;
  billing: any;
  id: any;
  orders: any = [];
  constructor(
    private authService: AuthService,
    private billingService: BillingService,
    private router: Router,
    private route: ActivatedRoute, private toast: ToastrService
  ) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getUser();
    this.getBilling();
    this.getOrders();
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

  getBilling() {
    this.billingService.show(this.id).subscribe((res: any) => {
      this.billing = res;
    });
  }

  getOrders() {
    this.billingService.orders(this.id).subscribe((res: any) => {
      this.orders = res;
    });
  }

  approvePayment(id: number) {

    Swal.fire({
      title: 'Are you sure want to approve payment?',
      text: 'You will not be able to recover this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, approve it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.value) {
        this.billingService.approveBilling(id).subscribe((res: any) => {
          this.toast.success(res.message, 'Success!');

          this.getBilling()
        });
        Swal.fire('Approved!', 'Payment has been approved.', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your billing is safe :)', 'error');

      }
    });
  }
}
