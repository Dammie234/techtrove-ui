import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { BillingService } from '../../../services/billing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-billings',
  templateUrl: './my-billings.component.html',
  styleUrl: './my-billings.component.css',
})
export class MyBillingsComponent implements OnInit {
  user: any;
  billings: any = [];
  loading: boolean = true
  loadingTitle: string = 'Loading My Billings'
  constructor(
    private authService: AuthService,
    private billingService: BillingService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getUser()
    this.getBillings()
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

  getBillings(){
    this.billingService.myBillings().subscribe((res: any) => {
      this.billings = res
      this.loading = false
    })
  }
}
