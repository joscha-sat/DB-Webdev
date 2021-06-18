import { Component, OnInit } from '@angular/core';
import { MovieHttpService } from '../../services/movie-http.service';
import { UserHttpService } from '../../services/user-http.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  pricesSnacks: number[] = [];

  pricesDrinks: number[] = [];

  sitzplaetze: FormArray | undefined;

  drinks: FormArray | undefined;

  snacks: FormArray | undefined;

  buttonClicked: number[] = [];

  buttonClicked2: number[] = [];

  formInput: number[] = [];

  formInput2: number[] = [];

  ticketform: FormGroup;

  movie = {
    title: '',
    image: '',
  };

  movieId: number;

  loggedIn: boolean = false;

  // ------------------------------------------------------------------------------------- || Methods ||

  getIsLoggedIn(): void {
    this.loggedIn = this.httpU.getIsLoggedIn();
  }

  getTotalPrice(): number {
    let sum1 = 0;
    let sum2 = 0;

    for (let i = 0; i < this.pricesSnacks.length; i++) {
      sum1 += this.pricesSnacks[i];
    }

    for (let j = 0; j < this.pricesDrinks.length; j++) {
      sum2 += this.pricesDrinks[j];
    }

    return sum1 + sum2;
  }

  getSnack(index: number): void {
    const arrayControl = this.ticketform?.get('snack') as FormArray;
    const item = arrayControl.at(index);

    this.httpM
      .getSnack(item.value.snack, item.value.size)
      .subscribe((result) => {
        this.pricesSnacks.push(result[0].price);
      });

    this.buttonClicked.push(1);
  }

  getFormHasInput(index: number): void {
    const arrayControl = this.ticketform?.get('drink') as FormArray;
    const item = arrayControl.at(index);

    if (item.value.drink && item.value.size) {
      this.formInput2.push(1);
    }
  }

  getFormHasInput2(index: number): void {
    const arrayControl = this.ticketform?.get('snacks') as FormArray;
    const item = arrayControl.at(index);

    if (item.value.snack && item.value.size) {
      this.formInput.push(1);
    }
  }

  getDrink(index: number): void {
    const arrayControl = this.ticketform?.get('drink') as FormArray;
    const item = arrayControl.at(index);

    console.log(item);

    this.httpM
      .getDrink(item.value.drink, item.value.size)
      .subscribe((result) => {
        this.pricesDrinks.push(result[0].price);
      });

    this.buttonClicked2.push(1);
  }

  changeInput(i: number): void {
    this.pricesSnacks.splice(i, 1);
    this.buttonClicked.splice(i, 1);
    this.formInput.splice(i, 1);
  }

  changeInput2(i: number): void {
    this.pricesDrinks.splice(i, 1);
    this.buttonClicked2.splice(i, 1);
    this.formInput2.splice(i, 1);
  }

  // | TICKET FORM MANIPULIEREN | ------------------------------- //

  createTicket(): FormGroup {
    return this.formBuilder.group({
      reihe: ['', [Validators.required]],
      platz: ['', [Validators.required]],
    });
  }

  addTicket(): void {
    this.sitzplaetze = this.ticketform?.get('sitzplatz') as FormArray;
    this.sitzplaetze.push(this.createTicket());
  }

  deleteTicket(i: number): void {
    this.sitzplaetze = this.ticketform?.get('sitzplatz') as FormArray;
    this.sitzplaetze.removeAt(i);
  }

  // | GETRÄNKE FORM MANIPULIEREN | ------------------------------- //

  createDrink(): FormGroup {
    return this.formBuilder.group({
      drink: ['', []],
      size: ['', []],
    });
  }

  addDrink(): void {
    this.drinks = this.ticketform?.get('drink') as FormArray;
    this.drinks.push(this.createDrink());
  }

  deleteDrink(i: number): void {
    this.drinks = this.ticketform?.get('drink') as FormArray;
    this.drinks.removeAt(i);

    this.pricesDrinks.splice(i, 1);
    this.buttonClicked2.splice(i, 1);
    this.formInput2.splice(i, 1);
  }

  // | SNACKS FORM MANIPULIEREN | ------------------------------- //

  createSnack(): FormGroup {
    return this.formBuilder.group({
      snack: ['', []],
      size: ['', []],
    });
  }

  addSnack(): void {
    this.snacks = this.ticketform?.get('snack') as FormArray;
    this.snacks.push(this.createSnack());
  }

  deleteSnack(i: number): void {
    this.snacks = this.ticketform?.get('snack') as FormArray;
    this.snacks.removeAt(i);

    this.pricesSnacks.splice(i, 1);
    this.buttonClicked.splice(i, 1);
    this.formInput.splice(i, 1);
  }

  onBuyTickets(): void {}

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

    // auf Veränderungen des Users reagieren
    this.httpU.updater$.subscribe(() => {
      this.getIsLoggedIn();
    });

    this.ticketform = this.formBuilder.group({
      sitzplatz: this.formBuilder.array([this.createTicket()]),
      drink: this.formBuilder.array([this.createDrink()]),
      snack: this.formBuilder.array([this.createSnack()]),
    });
  }
}
