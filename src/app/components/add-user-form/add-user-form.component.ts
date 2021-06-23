import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UserHttpService } from 'src/app/services/user-http.service';

@Component({
  selector: 'app-account-erstellen-form',
  templateUrl: './add-user-form.component.html',
  styleUrls: ['./add-user-form.component.scss'],
})
export class AddUserFormComponent implements OnInit {
  // --------------------------------------------------------------------------------- || Constructor ||
  constructor(
    private httpService: UserHttpService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  // ------------------------------------------------------------------------- || Variables + Objects ||
  form: FormGroup;

  // ------------------------------------------------------------------------------------- || Methods ||

  isMitarbeiter(): boolean {
    return this.form.value.role === 'Mitarbeiter';
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    const neuerKunde: User = {
      name: this.form.value.name,
      email: this.form.value.email,
      password: this.form.value.password,
      date_of_birth: this.form.value.date_of_birth,
      admin_secret: this.form.value.secret,
    };

    // den neuen User in das Array aus dem Service hinzufügen
    this.httpService.registerUser(neuerKunde).subscribe();

    this.form.reset();
    this.router.navigate(['/Login']);
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
      secret: [''],
      role: ['Kunde', [Validators.required]],
    });

    // Validation mit Bedingung

    this.form.get('role').valueChanges.subscribe((value) => {
      if (value === 'Mitarbeiter') {
        this.form.get('secret').setValidators([Validators.required]);
      } else {
        this.form.get('secret').clearValidators();
      }
      this.form.get('secret').updateValueAndValidity();
    });
  }
}
