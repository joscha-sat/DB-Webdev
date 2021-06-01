import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { KundeHttpService } from 'src/app/services/kunde-http.service';

@Component({
  selector: 'app-account-erstellen-form',
  templateUrl: './account-erstellen-form.component.html',
  styleUrls: ['./account-erstellen-form.component.scss'],
})
export class AccountErstellenFormComponent implements OnInit {
  // --------------------------------------------------------------------------------- || Constructor ||
  constructor(
    private httpService: KundeHttpService,
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

    const neuerKunde: User = {
      name: this.form.value.name,
      email: this.form.value.email,
      passwort: this.form.value.passwort,
      geburtsdatum: this.form.value.geburtsdatum,
    };

    this.form.reset();
    this.router.navigate(['/Startseite']);

    // den neuen Spieler in das Array aus dem Service hinzufügen
    this.httpService.addUser(neuerKunde).subscribe();
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
