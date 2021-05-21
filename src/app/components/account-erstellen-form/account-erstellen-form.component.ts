import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Kunde } from 'src/app/interfaces/kunde';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-account-erstellen-form',
  templateUrl: './account-erstellen-form.component.html',
  styleUrls: ['./account-erstellen-form.component.scss'],
})
export class AccountErstellenFormComponent implements OnInit {
  // --------------------------------------------------------------------------------- || Constructor ||
  constructor(
    private httpService: HttpService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  // ------------------------------------------------------------------------- || Variables + Objects ||
  form: FormGroup;

  // ------------------------------------------------------------------------------------- || Methods ||
  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    const neuerKunde: Kunde = {
      name: this.form.value.name,
      email: this.form.value.email,
      passwort: this.form.value.passwort,
      geburtsdatum: this.form.value.geburtsdatum,
    };

    console.log(neuerKunde);

    this.form.reset();
    this.router.navigate(['/Startseite']);

    // den neuen Spieler in das Array aus dem Service hinzufügen
    this.httpService.addUser(neuerKunde).subscribe((data) => {
      console.log(data);
    });
  }

  // ------------------------------------------------------------------------------------- || @Inputs ||

  // ---------------------------------------------------------------------------------- || @ViewChild ||

  // ------------------------------------------------------------------------------------ || ngOnInit ||
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      passwort: ['', [Validators.required, Validators.minLength(6)]],
      geburtsdatum: ['', [Validators.required]],
    });
  }
}
