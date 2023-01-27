import { inject, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterModule, RouterStateSnapshot, Routes, Router, TitleStrategy } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { RecipebooksComponent } from './recipebooks/recipebooks.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

import { AuthService } from './_services/auth/auth.service';
import { SignupComponent } from './signup/signup.component';
import { LogoutComponent } from './logout/logout.component';
import { Title } from '@angular/platform-browser';
import { ActivateComponent } from './activate/activate.component';

const OnlyWhenLoggedIn: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  
  if(authService.currentlySignedIn) {
    return true;
  } 
  return router.parseUrl('login');
}

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent, title: 'Home'},
  {path: 'login', component: LoginComponent, title: 'Login'},
  {path: 'logout', component: LogoutComponent, title: 'Logout'},
  {path: 'signup', component: SignupComponent, title: 'Signup'},
  {path: 'activate', component: ActivateComponent, title: 'Activate'},
  {path: 'books', component: RecipebooksComponent, canActivate: [OnlyWhenLoggedIn], title: 'Books'},
  {path: 'dashboard', component: DashboardComponent, canActivate: [OnlyWhenLoggedIn], title: 'Dashboard'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
