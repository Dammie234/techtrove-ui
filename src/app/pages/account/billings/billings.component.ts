import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { BillingService } from '../../../services/billing.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-billings',
  templateUrl: './billings.component.html',
  styleUrl: './billings.component.css',
})
export class BillingsComponent implements OnInit {
  user: any;
  billings: any = [];
  loading: boolean = true;
  loadingTitle: string = 'Loading Billings';
  constructor(
    private authService: AuthService,
    private billingService: BillingService,
    private router: Router, private toast: ToastrService
  ) {}
  ngOnInit(): void {
    this.getUser();
    this.getBillings();
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
  getBillings() {
    this.billingService.index().subscribe((res: any) => {
      this.billings = res;
      this.loading = false;
    });
  }

  approvePayment(id: number) {
    this.loading = true;
    this.loadingTitle = 'Approving Payment';
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
          this.loading = false;
          this.getBillings();
        });
        Swal.fire('Approved!', 'Payment has been approved.', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your billing is safe :)', 'error');
        this.loading = false;
      }
    });
  }
}
