import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Movie } from 'src/app/interfaces/movie';

import { MovieHttpService } from 'src/app/services/movie-http.service';
// import { mimeType } from './mime-type.validation';

@Component({
  selector: 'app-film-hinzufuegen-form',
  templateUrl: './add-movie-form.component.html',
  styleUrls: ['./add-movie-form.component.scss'],
})
export class AddMovieFormComponent implements OnInit {
  // --------------------------------------------------------------------------------- || Constructor ||
  constructor(
    private httpService: MovieHttpService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  // ------------------------------------------------------------------------- || Variables + Objects ||

  mode = 'Film_Hinzufuegen';

  movie_id: number;

  movie: Movie;

  form: FormGroup;

  preview: string;

  // ------------------------------------------------------------------------------------- || Methods ||
  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    if (this.mode === 'Film_Hinzufuegen') {
      const newMovie: Movie = {
        title: this.form.value.title,
        duration: this.form.value.duration,
        release_year: this.form.value.release_year,
        genre: this.form.value.genre,
        fsk: this.form.value.fsk,
        image: this.form.value.image,
        description: this.form.value.description,
        trailer: this.form.value.trailer,
      };

      this.httpService.addMovie(newMovie).subscribe();

      this.form.reset();
      this.router.navigate(['/Startseite']);
    } else {
      // Film bearbeiten

      const update_movie: Movie = {
        movie_id: this.movie_id,
        title: this.form.value.title,
        duration: this.form.value.duration,
        release_year: this.form.value.release_year,
        genre: this.form.value.genre,
        fsk: this.form.value.fsk,
        image: this.form.value.image,
        description: this.form.value.description,
        trailer: this.form.value.trailer,
      };

      this.httpService.updateMovie(update_movie).subscribe();

      this.form.reset();
      this.router.navigate(['/Startseite']);
    }
    this.form.reset();
    this.preview = '';
  }

  onImagePicked($event: Event): void {
    // ausgewählte File holen

    const file = ($event.target as HTMLInputElement).files[0];

    // input File an Form übergeben

    this.form.patchValue({ image: file });

    // form updaten und Validierung prüfen

    this.form.get('image').updateValueAndValidity();

    //  für Image Preview

    const reader = new FileReader();

    reader.onload = () => {
      this.preview = reader.result as string;
    };

    reader.readAsDataURL(file);
  }

  // ------------------------------------------------------------------------------------- || @Inputs ||

  // ---------------------------------------------------------------------------------- || @ViewChild ||

  // ------------------------------------------------------------------------------------ || ngOnInit ||

  ngOnInit(): void {
    // Form Validation
    this.form = this.formBuilder.group({
      title: [null, [Validators.required]],
      duration: [null, [Validators.required]],
      release_year: [null, [Validators.required]],
      genre: [null, [Validators.required]],
      fsk: [null, [Validators.required]],
      description: [null, [Validators.required, Validators.minLength(20)]],
      trailer: [null, [Validators.required, Validators.minLength(20)]],
      image: [null, [Validators.required]],
    });

    //  Prüfen ob Film Bearbeiten gewählt wurde

    this.activeRoute.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('movie_id')) {
        this.mode = 'Film_Bearbeiten';
        this.movie_id = +paramMap.get('movie_id');

        this.httpService.getOneMovie(this.movie_id).subscribe((result) => {
          this.movie = {
            title: result[0].title,
            duration: result[0].duration,
            release_year: result[0].release_year,
            genre: result[0].genre,
            fsk: result[0].fsk,
            image: result[0].image,
            description: result[0].description,
            trailer: result[0].trailer,
          };

          this.form.setValue({
            title: this.movie.title,
            duration: this.movie.duration,
            release_year: this.movie.release_year,
            genre: this.movie.genre,
            fsk: this.movie.fsk,
            description: this.movie.description,
            trailer: this.movie.trailer,
            image: this.movie.image,
          });
        });
      } else {
        this.mode = 'Film_Hinzufuegen';
        this.movie_id = null;
      }
    });
  }
}
