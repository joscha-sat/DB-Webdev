import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/movie';
import { ArrayFilterService } from 'src/app/Services/array-filter.service';
import { MovieHttpService } from 'src/app/services/movie-http.service';
import { UserHttpService } from '../../services/user-http.service';
import { User } from '../../interfaces/user';
import { CheckFSKService } from '../../services/check-fsk.service';

@Component({
  selector: 'app-movie-gallery',
  templateUrl: './movie-gallery.component.html',
  styleUrls: ['./movie-gallery.component.scss'],
})
export class MovieGalleryComponent implements OnInit {
  // --------------------------------------------------------------------------------- || Constructor ||
  constructor(
    private suchenService: ArrayFilterService,
    private httpService: MovieHttpService,
    private httpU: UserHttpService,
    private fskService: CheckFSKService
  ) {}

  // ------------------------------------------------------------------------- || Variables + Objects ||

  isAdmin = false;

  user: User;

  getGenreBoolean(): boolean {
    return this.httpService.genre;
  }

  // ------------------------------------------------------------------------------------- || Methods ||

  getIsAdmin(): void {
    this.isAdmin = this.httpU.getIsAdmin();
  }

  getLoggedInUser(): void {
    this.user = this.httpU.getUser();
  }

  checkFSK(date: Date, fsk: number): boolean {
    return this.fskService.checkFSK(date, fsk);
  }

  filteredFilme(): Movie[] {
    return this.suchenService.filteredFilmTitel(this.array, this.search);
  }

  deleteMovie(id: number): void {
    this.httpService.deleteOneMovie(id).subscribe();
  }

  // ------------------------------------------------------------------------------------- || @Inputs ||

  @Input() search: string = '';

  @Input() array: Movie[];

  // ------------------------------------------------------------------------------------ || ngOnInit ||
  ngOnInit(): void {
    // Initialwerte
    this.getIsAdmin();
    this.getLoggedInUser();

    // auf Veränderungen des Users reagieren
    this.httpU.updater$.subscribe(() => {
      this.getIsAdmin();
      this.getLoggedInUser();
    });
  }
}
