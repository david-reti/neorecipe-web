import { inject, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterModule, RouterStateSnapshot, Routes, Router, TitleStrategy } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { RecipebooksComponent } from './recipebooks/recipebooks.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

import { AuthService } from './_services/auth/auth.service';
import { SignupComponent } from './signup/signup.component';
import { LogoutComponent } from './logout/logout.component';
import { ActivateComponent } from './activate/activate.component';
import { RecipesComponent } from './recipes/recipes.component';
import { PantryComponent } from './pantry/pantry.component';
import { BookcreateComponent } from './bookcreate/bookcreate.component';
import { BookComponent } from './book/book.component';
import { BookeditComponent } from './bookedit/bookedit.component';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipecreateComponent } from './recipecreate/recipecreate.component';
import { RecipeeditComponent } from './recipeedit/recipeedit.component';

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
  {path: 'recipes', component: RecipesComponent, canActivate: [OnlyWhenLoggedIn], title: 'Recipes'},
  {path: 'pantry', component: PantryComponent, canActivate: [OnlyWhenLoggedIn], title: 'Pantry'},
  {path: 'books/create', component: BookcreateComponent, canActivate: [OnlyWhenLoggedIn], title: 'Create Book'},
  {path: 'books/:slug', component: BookComponent, canActivate: [OnlyWhenLoggedIn], title: 'Book'},
  {path: 'books/:slug/edit', component: BookeditComponent, canActivate: [OnlyWhenLoggedIn], title: 'Edit'},
  {path: 'recipes/create', component: RecipecreateComponent, canActivate: [OnlyWhenLoggedIn], title: 'Create Recipe'},
  {path: 'recipes/:slug', component: RecipeComponent, canActivate: [OnlyWhenLoggedIn], title: 'Recipe'},
  {path: 'recipes/:slug/edit', component: RecipeeditComponent, canActivate: [OnlyWhenLoggedIn], title: 'Edit'},
  {path: 'books', component: RecipebooksComponent, canActivate: [OnlyWhenLoggedIn], title: 'Books'},
  {path: 'dashboard', component: DashboardComponent, canActivate: [OnlyWhenLoggedIn], title: 'Dashboard'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
