import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistrierenComponent } from './pages/registrieren/registrieren.component';
import { StartseiteComponent } from './pages/startseite/startseite.component';
import { AddMoviePage } from './pages/add-movie-page/add-movie-page';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { MovieBuyTicketComponent } from './components/movie-buy-ticket/movie-buy-ticket.component';
import { UserGuard } from './guard/user.guard';
import { AdminGuard } from './guard/admin.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/Startseite',
    pathMatch: 'full',
  },
  {
    path: 'Startseite',
    component: StartseiteComponent,
  },
  {
    path: 'Film_Hinzufuegen',
    component: AddMoviePage,
    canActivate: [AdminGuard],
  },
  {
    path: 'Film_Bearbeiten/:movie_id',
    component: AddMoviePage,
    canActivate: [AdminGuard],
  },
  {
    path: 'Registrieren',
    component: RegistrierenComponent,
  },
  {
    path: 'Login',
    component: LoginComponent,
  },
  {
    path: 'Details/:movie_id',
    component: MovieDetailsComponent,
  },
  {
    path: 'Tickets/:movie_id',
    component: MovieBuyTicketComponent,
    canActivate: [UserGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
