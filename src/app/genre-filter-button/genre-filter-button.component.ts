import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../interfaces/movie';
import { MovieHttpService } from '../services/movie-http.service';
import { DEBUG } from '@angular/compiler-cli/src/ngtsc/logging/src/console_logger';
import { MovieGalleryComponent } from '../components/movie-gallery/movie-gallery.component';

@Component({
  selector: 'app-genre-filter-button',
  templateUrl: './genre-filter-button.component.html',
  styleUrls: ['./genre-filter-button.component.scss']
})
export class GenreFilterButtonComponent implements OnInit {


  @Input() genreName: string;



  constructor( private gallery: MovieGalleryComponent) {

  }



doAction(genre:string){

  this.gallery.genreFilteredFilme(genre);

}

  ngOnInit(): void {

  }

}
