import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UserHttpService } from 'src/app/services/user-http.service';

@Component({
  selector: 'app-account-erstellen-form',
  templateUrl: './account-erstellen-form.component.html',
  styleUrls: ['./account-erstellen-form.component.scss'],
})
export class AccountErstellenFormComponent implements OnInit {
  // --------------------------------------------------------------------------------- || Constructor ||
  constructor(
    private httpService: UserHttpService,
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
      password: this.form.value.password,
      date_of_birth: this.form.value.date_of_birth,
    };

    this.form.reset();
    this.router.navigate(['/Startseite']);

    // den neuen Spieler in das Array aus dem Service hinzufügen
    this.httpService.registerUser(neuerKunde).subscribe();
  }

  // ------------------------------------------------------------------------------------- || @Inputs ||

  // ---------------------------------------------------------------------------------- || @ViewChild ||

  // ------------------------------------------------------------------------------------ || ngOnInit ||
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      date_of_birth: ['', [Validators.required]],
    });
  }
}
