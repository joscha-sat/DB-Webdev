import { AddMovieFormComponent } from './components/add-movie-form/add-movie-form.component';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavbarComponent } from './components/navbar/navbar.component';
import { StartseiteComponent } from './pages/startseite/startseite.component';
import { AddMoviePage } from './pages/add-movie-page/add-movie-page';
import { KundenComponent } from './components/users/kunden.component';
import { AddUserFormComponent } from './components/add-user-form/add-user-form.component';
import { RegistrierenComponent } from './pages/registrieren/registrieren.component';
import { TitleComponent } from './components/title/title.component';
import { MovieGalleryComponent } from './components/movie-gallery/movie-gallery.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { LoginComponent } from './pages/login/login.component';
import { MovieDetailsTicketsComponent } from './components/movie-details-component/movie-details-tickets.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { SafePipe } from './pipes/safe.pipe';
import { MovieBuyTicketComponent } from './components/movie-buy-ticket/movie-buy-ticket.component';
import { UserGuard } from './guard/user.guard';
import { AdminGuard } from './guard/admin.guard';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { UpdateUserPageComponent } from './pages/update-user-page/update-user-page.component';
import { GenreFilterButtonComponent } from './components/genre-filter-button/genre-filter-button.component';
import { BuyPageComponent } from './components/movie-buy-ticket/buy-page/buy-page.component';
import { TicketHistoryComponent } from './pages/ticket-history/ticket-history.component';
import { ErrorComponent } from './components/error/error.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ErrorInterceptor } from './error-interceptor';




@NgModule({
  declarations: [
    AppComponent,
    StartseiteComponent,
    AddMoviePage,
    NavbarComponent,
    MovieGalleryComponent,
    KundenComponent,
    AddUserFormComponent,
    RegistrierenComponent,
    TitleComponent,
    AddMovieFormComponent,
    LoginFormComponent,
    LoginComponent,
    MovieDetailsTicketsComponent,
    MovieDetailsComponent,
    SafePipe,
    MovieBuyTicketComponent,
    UpdateUserComponent,
    UpdateUserPageComponent,
    GenreFilterButtonComponent,
    BuyPageComponent,
    TicketHistoryComponent,
    ErrorComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
  ],
  providers: [
    UserGuard,
    AdminGuard,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent],
})
export class AppModule {}
