import { Component, Input, OnInit } from '@angular/core';
import { StartseiteComponent } from '../../pages/startseite/startseite.component';

@Component({
  selector: 'app-genre-filter-button',
  templateUrl: './genre-filter-button.component.html',
  styleUrls: ['./genre-filter-button.component.scss'],
})
export class GenreFilterButtonComponent implements OnInit {
  // --------------------------------------------------------------------------------- || Constructor ||
  constructor(private gallery: StartseiteComponent) {}

  // ------------------------------------------------------------------------- || Variables + Objects ||

  // ------------------------------------------------------------------------------------- || Methods ||

  filterGenre(genre: string): void {
    this.gallery.genreFilteredFilme(genre);
  }

  // ------------------------------------------------------------------------------------- || @Inputs ||

  @Input() genreName: string;

  @Input() color: string;

  // ---------------------------------------------------------------------------------- || @ViewChild ||

  // ------------------------------------------------------------------------------------ || ngOnInit ||
  ngOnInit(): void {}
}
