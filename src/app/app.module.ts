import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilmGalerieComponent } from './components/film-galerie/film-galerie.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { StartseiteComponent } from './pages/startseite/startseite.component';

@NgModule({
  declarations: [
    AppComponent,
    FilmGalerieComponent,
    NavbarComponent,
    StartseiteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
