import { Component, OnInit } from '@angular/core';
import { MovieHttpService } from '../../services/movie-http.service';
import { UserHttpService } from '../../services/user-http.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Drink } from '../../interfaces/drink';
import { Snack } from '../../interfaces/snack';

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

  ticketform: FormGroup;

  ticketList: FormArray;

  //

  clicked = false;

  //

  snacksPrice: number;

  snacksList: Snack[] = [];

  snacksSize: Snack[] = [];

  //

  drinksPrice: number;

  drinksList: Drink[] = [];

  drinksSize: Drink[] = [];

  //

  movieId: number;

  loggedIn: boolean = false;

  movie = {
    title: '',
    image: '',
  };

  // ------------------------------------------------------------------------------------- || Methods ||

  // | SNACKS | ////////////////////////////////////////////////////////////////////////////////

  getSnacks(): void {
    this.httpM.getSnacks().subscribe((snackList) => {
      this.snacksList = snackList;
    });
  }

  getSnackPrice(): void {
    if (
      !this.ticketform.get('snack_name').value ||
      this.ticketform.get('snack_name').value === '' ||
      !this.ticketform.get('snack_size').value
    ) {
      this.snacksPrice = 0;
    } else {
      this.httpM
        .getSnackPrices(
          this.ticketform.get('snack_name').value,
          this.ticketform.get('snack_size').value
        )
        .subscribe((result) => {
          this.snacksPrice = result[0].price;
        });
    }
  }

  getSnackSize(): void {
    if (
      !this.ticketform.get('snack_name').value ||
      this.ticketform.get('snack_name').value === ''
    ) {
      return;
    }
    this.httpM
      .getSnackSizes(this.ticketform.get('snack_name').value)
      .subscribe((result) => {
        this.snacksSize = result;
      });
  }

  // | DRINKS | ////////////////////////////////////////////////////////////////////////////////

  getDrinks(): void {
    this.httpM.getDrinks().subscribe((drinkList) => {
      this.drinksList = drinkList;
    });
  }

  getDrinkPrice(): void {
    if (
      !this.ticketform.get('drink_name').value ||
      this.ticketform.get('drink_name').value === '' ||
      !this.ticketform.get('drink_size').value
    ) {
      this.drinksPrice = 0;
    } else {
      this.httpM
        .getDrinkPrices(
          this.ticketform.get('drink_name').value,
          this.ticketform.get('drink_size').value
        )
        .subscribe((result) => {
          this.drinksPrice = result[0].price;
        });
    }
  }

  getDrinkSize(): void {
    if (
      !this.ticketform.get('drink_name').value ||
      this.ticketform.get('drink_name').value === ''
    ) {
      return;
    }
    this.httpM
      .getDrinkSizes(this.ticketform.get('drink_name').value)
      .subscribe((result) => {
        this.drinksSize = result;
      });
  }

  // | SONSTIGE | ////////////////////////////////////////////////////////////////////////////////

  getIsLoggedIn(): void {
    this.loggedIn = this.httpU.getIsLoggedIn();
  }

  getTotalPriceSnackAndDrinks(): number {
    if (!this.snacksPrice && !this.drinksPrice) {
      return 0;
    }
    if (this.snacksPrice && !this.drinksPrice) {
      return this.snacksPrice;
    }
    if (!this.snacksPrice && this.drinksPrice) {
      return this.drinksPrice;
    }
    return this.snacksPrice + this.drinksPrice;
  }

  getTotalPrice(): number {
    if (
      this.ticketform.get('reihe').value &&
      this.ticketform.get('platz').value
    ) {
      return this.getTotalPriceSnackAndDrinks() + 10;
    } else {
      return this.getTotalPriceSnackAndDrinks();
    }
  }

  onBuyTickets(): void {
    this.clicked = true;
  }

  // ------------------------------------------------------------------------------------- || @Inputs ||

  // ---------------------------------------------------------------------------------- || @ViewChild ||

  // ------------------------------------------------------------------------------------ || ngOnInit ||
  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('movie_id')) {
        this.movieId = +paramMap.get('movie_id');

        this.httpM.getOneMovie(this.movieId).subscribe((result) => {
          this.movie = {
            title: result[0].title,
            image: result[0].image,
          };
        });
      }
    });

    // Initialwert setzen für den Status loggedIn
    this.getIsLoggedIn();

    this.getSnacks();

    this.getDrinks();

    // auf Veränderungen des Users reagieren
    this.httpU.updater$.subscribe(() => {
      this.getIsLoggedIn();
    });

    this.ticketform = this.formBuilder.group({
      reihe: [null, Validators.required],
      platz: [null, Validators.required],
      snack_name: null,
      snack_size: null,
      drink_name: null,
      drink_size: null,
      tag: [null, Validators.required],
      uhrzeit: [null, Validators.required],
    });
  }
}
