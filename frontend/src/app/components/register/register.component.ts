import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  username!: string;
  password!: string;
  retypePassword!: string;
  email!: string;
  firstName!: string;
  lastName!: string;

  error!: boolean;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  register() {
    if (this.password === this.retypePassword) {
      this.authService
        .register(
          this.username,
          this.password,
          this.email,
          this.firstName,
          this.lastName
        )
        .subscribe(
          (response) => {
            if (response) {
              this.router.navigate(['/login']);
            }
          },
          (error) => {
            console.log(error);
          }
        );
    } else {
      this.error = true;
    }
  }
}
