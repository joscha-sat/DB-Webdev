import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistrierenComponent } from './pages/registrieren/registrieren.component';
import { StartseiteComponent } from './pages/startseite/startseite.component';
import { ZweiteSeiteComponent } from './pages/zweite-seite/zweite-seite.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/Startseite', pathMatch: 'full' },
  { path: 'Startseite', component: StartseiteComponent },
  { path: 'ZweiteSeite', component: ZweiteSeiteComponent },
  { path: 'Registrieren', component: RegistrierenComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'Movie_details/:movie_id', component: MovieDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
