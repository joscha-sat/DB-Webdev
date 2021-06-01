import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    private router: Router
  ) {}

  // ------------------------------------------------------------------------- || Variables + Objects ||
  form: FormGroup;

  selectedImage: File;

  preview: string;

  // ------------------------------------------------------------------------------------- || Methods ||
  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    // Bild lokal im assets Ordner abspeichern
    this.httpService.uploadImage(this.selectedImage);

    const newMovie: Movie = {
      title: this.form.value.title,
      duration: this.form.value.duration,
      release_year: this.form.value.release_year,
      genre: this.form.value.genre,
      fks: this.form.value.fks,
      image: this.selectedImage.name,
    };

    this.form.reset();
    this.router.navigate(['/Startseite']);

    this.httpService.addMovie(newMovie).subscribe();
  }

  onFileChanged(event: Event): void {
    this.selectedImage = (event.target as HTMLInputElement).files[0];
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
    this.form = this.formBuilder.group({
      title: ['', [Validators.required]],
      duration: ['', [Validators.required]],
      release_year: ['', [Validators.required]],
      genre: ['', [Validators.required]],
      fks: ['', [Validators.required]],
      image: ['', [Validators.required]],
    });
  }
}
