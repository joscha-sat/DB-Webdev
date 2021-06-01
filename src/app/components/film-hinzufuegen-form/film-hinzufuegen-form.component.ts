import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Film } from 'src/app/Interfaces/film';

import { FilmHttpService } from 'src/app/services/film-http.service';

@Component({
  selector: 'app-film-hinzufuegen-form',
  templateUrl: './film-hinzufuegen-form.component.html',
  styleUrls: ['./film-hinzufuegen-form.component.scss'],
})
export class FilmHinzufuegenFormComponent implements OnInit {
  // --------------------------------------------------------------------------------- || Constructor ||
  constructor(
    private httpService: FilmHttpService,
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

    const newMovie: Film = {
      titel: this.form.value.titel,
      filmdauer: this.form.value.filmdauer,
      genre: this.form.value.genre,
      erscheinungsjahr: this.form.value.erscheinungsjahr,
      altersfreigabe: this.form.value.altersfreigabe,
      bild: this.selectedImage.name,
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
      titel: ['', [Validators.required, Validators.minLength(3)]],
      filmdauer: ['', [Validators.required]],
      genre: ['', [Validators.required]],
      erscheinungsjahr: ['', [Validators.required]],
      altersfreigabe: ['', [Validators.required]],
      bild: ['', [Validators.required]],
    });
  }
}
