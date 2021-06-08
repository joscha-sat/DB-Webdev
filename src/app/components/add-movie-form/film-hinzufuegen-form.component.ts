import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Movie } from 'src/app/interfaces/movie';

import { MovieHttpService } from 'src/app/services/movie-http.service';

@Component({
  selector: 'app-film-hinzufuegen-form',
  templateUrl: './film-hinzufuegen-form.component.html',
  styleUrls: ['./film-hinzufuegen-form.component.scss'],
})
export class FilmHinzufuegenFormComponent implements OnInit {
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

  selectedImage: File;

  preview: string;

  // ------------------------------------------------------------------------------------- || Methods ||
  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    if (this.mode === 'Film_Hinzufuegen') {
      // Bild lokal im assets Ordner abspeichern
      this.httpService.uploadImage(this.selectedImage);

      const newMovie: Movie = {
        title: this.form.value.title,
        duration: this.form.value.duration,
        release_year: this.form.value.release_year,
        genre: this.form.value.genre,
        fsk: this.form.value.fsk,
        image: this.selectedImage.name,
        description: this.form.value.description,
        trailer: this.form.value.trailer,
      };

      this.form.reset();
      this.router.navigate(['/Startseite']);

      this.httpService.addMovie(newMovie).subscribe();
    } else {
      this.httpService.updateMovie(
        this.movie_id,
        this.form.value.title,
        this.form.value.duration,
        this.form.value.release_year,
        this.form.value.genre,
        this.form.value.fsk,
        this.form.value.image,
        this.form.value.description,
        this.form.value.trailer
      );
    }
    this.form.reset();
    this.preview = '';
  }

  onFileChanged(event: Event): void {
    this.selectedImage = (event.target as HTMLInputElement).files[0];
    // this.form.patchValue({ image: this.selectedImage }); //storing file - object
    const reader = new FileReader();
    reader.onload = () => {
      this.preview = reader.result as string;
    };
    reader.readAsDataURL(this.selectedImage);
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
            image: '',
            description: result[0].description,
            trailer: result[0].trailer,
          };

          console.log(this.movie);

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
