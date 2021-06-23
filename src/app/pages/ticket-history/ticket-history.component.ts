import { Component, OnInit } from '@angular/core';
import { Ticket } from '../../interfaces/ticket';
import { UserHttpService } from '../../services/user-http.service';
import { MovieHttpService } from '../../services/movie-http.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-ticket-history',
  templateUrl: './ticket-history.component.html',
  styleUrls: ['./ticket-history.component.scss'],
})
export class TicketHistoryComponent implements OnInit {
  // --------------------------------------------------------------------------------- || Constructor ||
  constructor(
    private httpU: UserHttpService,
    private httpM: MovieHttpService
  ) {}

  // ------------------------------------------------------------------------- || Variables + Objects ||

  tickets: Ticket[] = [];

  loggedInUser: User;

  // ------------------------------------------------------------------------------------- || Methods ||

  getLoggedInUser(): void {
    this.loggedInUser = this.httpU.getUser();
  }

  getTickets(): void {
    this.httpM.getTickets(this.loggedInUser.user_id).subscribe((tickets) => {
      this.tickets = tickets;
    });
  }

  // ------------------------------------------------------------------------------------- || @Inputs ||

  // ---------------------------------------------------------------------------------- || @ViewChild ||

  // ------------------------------------------------------------------------------------ || ngOnInit ||

  ngOnInit(): void {
    this.getLoggedInUser();
    this.getTickets();
  }
}
