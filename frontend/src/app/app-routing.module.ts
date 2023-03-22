import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DamageCalculatorComponent } from './components/damage-calculator/damage-calculator.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { MyDeclarationsComponent } from './components/my-declarations/my-declarations.component';
import { MyVehiclesComponent } from './components/my-vehicles/my-vehicles.component';
import { RegisterComponent } from './components/register/register.component';
import {
  AuthGuard,
  LoginGuard,
} from './services/auth-guard/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'home',
    component: HomepageComponent,
    children: [
      { path: 'my-declarations', component: MyDeclarationsComponent },
      { path: 'my-vehicles', component: MyVehiclesComponent },
      { path: 'damage-calculator', component: DamageCalculatorComponent },
    ],
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
