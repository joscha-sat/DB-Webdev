import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovieGalleryComponent } from './components/movie-gallery/movie-gallery.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { StartseiteComponent } from './pages/startseite/startseite.component';
import { ZweiteSeiteComponent } from './pages/zweite-seite/zweite-seite.component';

@NgModule({
  declarations: [
    AppComponent,
    StartseiteComponent,
    ZweiteSeiteComponent,
    NavbarComponent,
    MovieGalleryComponent,
  ],

  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
