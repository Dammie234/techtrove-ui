import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Emitters } from '../../emitters/emitters';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  user: any;
  authenticated: boolean = false;


  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    Emitters.authEmitter.subscribe((auth: boolean) => {
      this.authenticated = auth;
    });
    this.getUser();
  }

  getUser() {
    this.authService.user().subscribe(
      (res: any) => {
        this.user = res;

        Emitters.authEmitter.emit(true);
      },
      (err) => {
        Emitters.authEmitter.emit(false);
      }
    );
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.authenticated = false;
    });
  }
}
