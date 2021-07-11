import {Component, OnInit} from '@angular/core';
import {MovieHttpService} from '../../services/movie-http.service';
import {UserHttpService} from '../../services/user-http.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Drink} from '../../interfaces/drink';
import {Snack} from '../../interfaces/snack';
import {Ticket} from '../../interfaces/ticket';
import {User} from '../../interfaces/user';
import {CheckFSKService} from '../../services/check-fsk.service';
import {Show} from 'src/app/interfaces/show';
import {Observable} from "rxjs";

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
    private fskService: CheckFSKService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
  }

  // ------------------------------------------------------------------------- || Variables + Objects ||

  ticketform: FormGroup;

  ticketList: FormArray;

  //

  loggedInUser: User;

  clicked = false;

  //

  snacksPrice: number;

  snacksList: Snack[] = [];

  snacksSize: Snack[] = [];
  
  isSeatTaken:boolean=false;
  //

  timeslots: String[] = ["19:00 Uhr", "23:00 Uhr"];

  //

  drinksPrice: number;

  drinksList: Drink[] = [];

  drinksSize: Drink[] = [];

  //

  movieId: number;

  show: Show;

  loggedIn: boolean = false;

  movie = {
    title: '',
    image: '',
    fsk: null,
  };

  // ------------------------------------------------------------------------------------- || Methods ||

  getAvailableSubscription(): Observable<boolean> {
    let seat = this.ticketform.get('platz').value;
    let row = this.ticketform.get('reihe').value;
    let idMovie = this.movieId;
    let day = this.ticketform.get('tag').value;
    let time = this.ticketform.get('uhrzeit').value;

    return new Observable<boolean>(subscriber => {
      this.httpM.getAvailabilityForShow(idMovie, seat, row, day, time).subscribe((show) => {

        subscriber.next(true);
        if (show.length > 0) {
          subscriber.next(true);

        }else{
          subscriber.next(false);
        }


      });

    })
  }


  getLoggedInUser(): void {
    this.loggedInUser = this.httpU.getUser();
  }

  checkFSK(date: Date, fsk: number): boolean {
    return this.fskService.checkFSK(date, fsk);
  }

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
      !this.ticketform.get('snack_size').value ||
      this.ticketform.get('snack_size').value === ''
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
    this.snacksSize = [];
    this.ticketform.patchValue({
      snack_size: null,
    });
    this.snacksPrice = 0;
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
    this.drinksSize = [];

    this.ticketform.patchValue({
      drink_size: null,
    });

    this.drinksPrice = 0;

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

  gettimeSlots(): String[] {
    let availableTimeSlots = [];
    let dtToday = new Date();

    let selectedDate = new Date(this.ticketform.get('tag').value);


    for (let i = 0; i < this.timeslots.length; i++) {
      availableTimeSlots.push(this.timeslots[i]);
      //if date ist today
      if ((selectedDate.getTime() < dtToday.getTime())) {
        //if timeslot is past
        if ((Number(this.timeslots[i].slice(0, 2)) < dtToday.getHours())) {

          availableTimeSlots.pop();
        }
      }
    }
    if(this.ticketform.get('uhrzeit').value==null){
      this.ticketform.controls['uhrzeit'].setValue(availableTimeSlots[0]);
    }

    return availableTimeSlots;
  }

  getCurrentDate(): string {
    let dtToday = new Date();
    let month: any = dtToday.getMonth() + 1;
    let day: any = dtToday.getDate();
    let year = dtToday.getFullYear();

    if (month < 10) {
      month = "0" + month.toString();
    }

    if (day < 10) {
      day = "0" + day.toString();
    }
    return year + '-' + month.toString() + '-' + day.toString();

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
    const today = new Date();

    const formatToday = today.toDateString();

    console.log(formatToday);

    const ticket: Ticket = {
      id_user: this.loggedInUser.user_id,

      movie_name: this.movie.title,

      seat_row: this.ticketform.value.reihe,
      seat_number: this.ticketform.value.platz,

      snack_name: this.ticketform.value.snack_name,
      snack_size: this.ticketform.value.snack_size,
      snack_price: this.snacksPrice,

      drink_name: this.ticketform.value.drink_name,
      drink_size: this.ticketform.value.drink_size,
      drink_price: this.drinksPrice,

      total_price: this.getTotalPrice(),

      date_of_show: this.ticketform.value.tag,
      time_of_Show: this.ticketform.value.uhrzeit,

      date_bought: formatToday,
    };
    const show = {
      id_movie: this.movieId,
      row: this.ticketform.value.reihe,
      seat: this.ticketform.value.platz,
      day: this.ticketform.value.tag,
      time: this.ticketform.value.uhrzeit
    };

    this.httpM.addTicket(ticket).subscribe();
    this.httpM.addShow(show).subscribe();

    this.getAvailableSubscription().subscribe(isTaken =>{
      if (isTaken){
        this.isSeatTaken=true;
      }else{
        this.isSeatTaken=false;
        this.clicked = true;
      }
    });





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
            fsk: result[0].fsk,
          };
        });
      }
    });

    // Initialwert setzen für den Status loggedIn
    this.getIsLoggedIn();

    this.getSnacks();

    this.getDrinks();

    this.getLoggedInUser();

    // auf Veränderungen des Users reagieren
    this.httpU.updater$.subscribe(() => {
      this.getIsLoggedIn();
      this.getLoggedInUser();
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
