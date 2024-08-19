import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BillingService } from '../../../../services/billing.service';

@Component({
  selector: 'app-my-billing',
  templateUrl: './my-billing.component.html',
  styleUrl: './my-billing.component.css',
})
export class MyBillingComponent implements OnInit {
  user: any;
  billing: any;
  id: any;
  orders: any = [];
  constructor(
    private authService: AuthService,
    private router: Router,
    private billingService: BillingService, private route: ActivatedRoute
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
}
