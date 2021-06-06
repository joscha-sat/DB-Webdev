// import { MovieGalleryComponent } from './components/movie-gallery/movie-gallery.component';
import { FilmHinzufuegenFormComponent } from './components/add-movie-form/film-hinzufuegen-form.component';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavbarComponent } from './components/navbar/navbar.component';
import { StartseiteComponent } from './pages/startseite/startseite.component';
import { AddMoviePage } from './pages/add-movie-page/add-movie-page';
import { KundenComponent } from './components/users/kunden.component';
import { AccountErstellenFormComponent } from './components/add-user-form/account-erstellen-form.component';
import { RegistrierenComponent } from './pages/registrieren/registrieren.component';
import { TitelComponent } from './components/title/titel.component';
import { MovieGalleryComponent } from './components/movie-gallery/movie-gallery.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { LoginComponent } from './pages/login/login.component';
import { MovieDetailsTicketsComponent } from './components/movie-details-component/movie-details-tickets.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { SafePipe } from './pipes/safe.pipe';
import { MovieBuyTicketComponent } from './components/movie-buy-ticket/movie-buy-ticket.component';
import { UserGuard } from './guard/user.guard';
import { AdminGuard } from './guard/admin.guard';

@NgModule({
  declarations: [
    AppComponent,
    StartseiteComponent,
    AddMoviePage,
    NavbarComponent,
    MovieGalleryComponent,
    KundenComponent,
    AccountErstellenFormComponent,
    RegistrierenComponent,
    TitelComponent,
    FilmHinzufuegenFormComponent,
    LoginFormComponent,
    LoginComponent,
    MovieDetailsTicketsComponent,
    MovieDetailsComponent,
    SafePipe,
    MovieBuyTicketComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [UserGuard, AdminGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
