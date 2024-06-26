import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username!: string;
  password!: string;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        if (response) {
          this.router.navigate(['/home/news']);
        }
      },
      (error) => {
        console.log('Login error:', error);
        // Handle the error here
      }
    );
  }

  routeToRegister() {
    this.router.navigate(['/register']);
  }

  routeToFill() {
    this.router.navigate(['/declaration-fill']);
  }

  ngOnInit(): void {}
}
