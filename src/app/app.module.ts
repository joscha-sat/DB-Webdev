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
import { ZweiteSeiteComponent } from './pages/zweite-seite/zweite-seite.component';
import { KundenComponent } from './components/users/kunden.component';
import { AccountErstellenFormComponent } from './components/add-user-form/account-erstellen-form.component';
import { RegistrierenComponent } from './pages/registrieren/registrieren.component';
import { TitelComponent } from './components/title/titel.component';
import { MovieGalleryComponent } from './components/movie-gallery/movie-gallery.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { LoginComponent } from './pages/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    StartseiteComponent,
    ZweiteSeiteComponent,
    NavbarComponent,
    MovieGalleryComponent,
    KundenComponent,
    AccountErstellenFormComponent,
    RegistrierenComponent,
    TitelComponent,
    FilmHinzufuegenFormComponent,
    LoginFormComponent,
    LoginComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
