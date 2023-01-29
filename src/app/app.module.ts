import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RecipebooksComponent } from './recipebooks/recipebooks.component';
import { ProfilebuttonComponent } from './profilebutton/profilebutton.component';
import { LoginComponent } from './login/login.component';
import { MessageService } from './_services/message/message.service';
import { MessagedisplayComponent } from './messagedisplay/messagedisplay.component';
import { SignupComponent } from './signup/signup.component';
import { LongerroroutletComponent } from './longerroroutlet/longerroroutlet.component';
import { LogoutComponent } from './logout/logout.component';

import { NeorecipeTitleStrategy } from './_util/titleStrategy';
import { TitleStrategy } from '@angular/router';
import { AuthInterceptor } from './_util/authInterceptor';
import { ActivateComponent } from './activate/activate.component';
import { BackgroundComponent } from './background/background.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    DashboardComponent,
    RecipebooksComponent,
    ProfilebuttonComponent,
    LoginComponent,
    MessagedisplayComponent,
    SignupComponent,
    LongerroroutletComponent,
    LogoutComponent,
    ActivateComponent,
    BackgroundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: TitleStrategy,
      useClass: NeorecipeTitleStrategy,
    },
    MessageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
