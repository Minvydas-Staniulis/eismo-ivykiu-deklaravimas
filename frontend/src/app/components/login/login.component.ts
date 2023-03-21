import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username!: string;
  password!: string;

  constructor(private authService: AuthService) {}

  login() {
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        console.log('Login response:', response);
        // Handle the response here
      },
      (error) => {
        console.log('Login error:', error);
        // Handle the error here
      }
    );
  }

  ngOnInit(): void {}
}
