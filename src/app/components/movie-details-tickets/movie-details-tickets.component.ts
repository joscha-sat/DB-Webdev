import { Component, OnInit } from '@angular/core';
import { MovieHttpService } from '../../services/movie-http.service';
import { Movie } from '../../interfaces/movie';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { UserHttpService } from '../../services/user-http.service';

@Component({
  selector: 'app-movie-details-tickets',
  templateUrl: './movie-details-tickets.component.html',
  styleUrls: ['./movie-details-tickets.component.scss'],
})
export class MovieDetailsTicketsComponent implements OnInit {
  // --------------------------------------------------------------------------------- || Constructor ||
  constructor(
    private httpM: MovieHttpService,
    private httpU: UserHttpService,
    private route: ActivatedRoute
  ) {}

  // ------------------------------------------------------------------------- || Variables + Objects ||

  oneMovie: Movie;

  movieId: number;

  loggedIn: boolean = false;

  // ------------------------------------------------------------------------------------- || Methods ||
  getIsLoggedIn(): void {
    this.loggedIn = this.httpU.getIsLoggedIn();
  }

  // ------------------------------------------------------------------------------------- || @Inputs ||

  // ---------------------------------------------------------------------------------- || @ViewChild ||

  // ------------------------------------------------------------------------------------ || ngOnInit ||
  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('movie_id')) {
        this.movieId = +paramMap.get('movie_id');

        this.httpM.getOneMovie(this.movieId).subscribe((result) => {
          this.oneMovie = result[0];
        });
      }
    });

    // Initialwert setzen für den Status loggedIn
    this.getIsLoggedIn();

    // auf Veränderungen des Users reagieren
    this.httpU.updater$.subscribe(() => {
      this.getIsLoggedIn();
    });
  }
}
