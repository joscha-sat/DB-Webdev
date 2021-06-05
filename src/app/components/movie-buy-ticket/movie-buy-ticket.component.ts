import { Component, OnInit } from '@angular/core';
import { MovieHttpService } from '../../services/movie-http.service';
import { UserHttpService } from '../../services/user-http.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Movie } from '../../interfaces/movie';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-movie-buy-ticket',
  templateUrl: './movie-buy-ticket.component.html',
  styleUrls: ['./movie-buy-ticket.component.scss'],
})
export class MovieBuyTicketComponent implements OnInit {
  // --------------------------------------------------------------------------------- || Constructor ||

  constructor(
    private httpM: MovieHttpService,
    private httpU: UserHttpService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  // ------------------------------------------------------------------------- || Variables + Objects ||

  sitzplatz: any = [
    {
      id: 1,
      reihe: '',
      platz: '',
    },
  ];

  ticketform: FormGroup;

  oneMovie: Movie;

  movieId: number;

  loggedIn: boolean = false;

  // ------------------------------------------------------------------------------------- || Methods ||

  addSitzplatz(): void {
    this.sitzplatz.push({
      id: this.sitzplatz.length + 1,
      reihe: '',
      platz: '',
    });
  }

  removeSitzplatz(i: number): void {
    this.sitzplatz.splice(i, 1);
  }

  getIsLoggedIn(): void {
    this.loggedIn = this.httpU.getIsLoggedIn();
  }

  onBuyTickets(): void {
    console.log(this.sitzplatz);
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

    this.ticketform = this.formBuilder.group({
      letter: ['', [Validators.required]],
      number: ['', [Validators.required]],
      drinks: ['', []],
      size: ['', []],
    });
  }
}
