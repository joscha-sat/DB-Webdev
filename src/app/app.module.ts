import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovieGalleryComponent } from './components/movie-gallery/movie-gallery.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { StartseiteComponent } from './pages/startseite/startseite.component';
import { ZweiteSeiteComponent } from './pages/zweite-seite/zweite-seite.component';
import { KundenComponent } from './components/kunden/kunden.component';
import { AccountErstellenFormComponent } from './components/account-erstellen-form/account-erstellen-form.component';
import { RegistrierenComponent } from './pages/registrieren/registrieren.component';

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
  ],

  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
