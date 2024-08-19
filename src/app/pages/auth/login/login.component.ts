import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private authService: AuthService, private router: Router, private toast: ToastrService){}
  email!: string
  password!: string
  loading: boolean = false
  loadingTitle: string = 'Signing In'
  error: string = ''


  submit(){
    this.loading = true
    let inputData = {
      email: this.email,
      password: this.password
    }

    this.authService.login(inputData).subscribe({
      next: (res: any) => {
        this.loading = false
        this.toast.success(res.message, 'Success')
        this.router.navigate(['/account/dashboard'])
      },
      error: (err: any) => {
        this.loading = false
        this.error = err.error.message
        this.toast.error(this.error, 'Error')
      }
    })
  }
}
