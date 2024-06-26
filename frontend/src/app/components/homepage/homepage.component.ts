import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  userInfo: any;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const userInfoString = localStorage.getItem('user');
    if (userInfoString) {
      this.userInfo = JSON.parse(userInfoString);
      console.log(this.userInfo.first_name);
    }
  }

  logout() {
    this.authService.logout().subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
    this.router.navigate(['/login']);
  }
}
