import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartseiteComponent } from './pages/startseite/startseite.component';
import { ZweiteSeiteComponent } from './pages/zweite-seite/zweite-seite.component';

const routes: Routes = [
  { path: '', redirectTo: '/Startseite', pathMatch: 'full' },
  { path: 'Startseite', component: StartseiteComponent },
  { path: 'ZweiteSeite', component: ZweiteSeiteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
