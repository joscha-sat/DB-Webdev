import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

import { MovieBuyTicketComponent } from '../movie-buy-ticket.component';
import { User } from '../../../interfaces/user';
import { UserHttpService } from '../../../services/user-http.service';
import { CheckFSKService } from '../../../services/check-fsk.service';
import { MovieHttpService } from '../../../services/movie-http.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-buy-page',
  templateUrl: './buy-page.component.html',
  styleUrls: ['./buy-page.component.scss'],
})
export class BuyPageComponent implements OnInit {
  // --------------------------------------------------------------------------------- || Constructor ||
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private httpU: UserHttpService,
    private httpM: MovieHttpService,
    private fskService: CheckFSKService,
    private route: ActivatedRoute
  ) {}

  // ------------------------------------------------------------------------- || Variables + Objects ||

  loggedInUser: User;

  movieId: number;

  movieFSK: number;

  // ------------------------------------------------------------------------------------- || Methods ||

  add(): void {
    const childComponent =
      this.componentFactoryResolver.resolveComponentFactory(
        MovieBuyTicketComponent
      );
    this.componentRef = this.target.createComponent(childComponent);
  }

  getLoggedInUser(): void {
    this.loggedInUser = this.httpU.getUser();
  }

  checkFSK(date: Date, fsk: number): boolean {
    return this.fskService.checkFSK(date, fsk);
  }

  // ------------------------------------------------------------------------------------- || @Inputs ||

  // ---------------------------------------------------------------------------------- || @ViewChild ||

  @ViewChild('parent', { read: ViewContainerRef }) target: ViewContainerRef;

  private componentRef: ComponentRef<any>;

  // ------------------------------------------------------------------------------------ || ngOnInit ||
  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('movie_id')) {
        this.movieId = +paramMap.get('movie_id');
        this.httpM.getOneMovie(this.movieId).subscribe((result) => {
          this.movieFSK = result[0].fsk;
        });
      }
    });

    this.getLoggedInUser();

    this.httpU.updater$.subscribe(() => {
      this.getLoggedInUser();
    });
  }
}
