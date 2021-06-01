import { Component, OnInit } from '@angular/core';
import { KundeHttpService } from '../../services/kunde-http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  // --------------------------------------------------------------------------------- || Constructor ||
  constructor(
    private httpService: KundeHttpService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  // ------------------------------------------------------------------------- || Variables + Objects ||
  form: FormGroup;

  user: User;

  // ------------------------------------------------------------------------------------- || Methods ||
  onLogin(): void {
    if (this.form.invalid) {
      return;
    }

    const email = this.form.value.email;
    const passwort = this.form.value.passwort;

    this.httpService.loginUser(email, passwort).subscribe();

    this.form.reset();
  }

  // ------------------------------------------------------------------------------------- || @Inputs ||

  // ---------------------------------------------------------------------------------- || @ViewChild ||

  // ------------------------------------------------------------------------------------ || ngOnInit ||
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      passwort: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
}
