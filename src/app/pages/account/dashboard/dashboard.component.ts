import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  user: any
  constructor(private authService: AuthService, private router: Router){}
  ngOnInit(): void {
      this.getUser()
  }

  getUser(){
    this.authService.user().subscribe(
      (res: any) => {
        this.user = res
      },
      (err: any) => {
        this.router.navigate(['/auth/login'])
      }
    )
  }


}
