import { Component, OnInit } from '@angular/core';
import { UserHttpService } from '../../services/user-http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  // --------------------------------------------------------------------------------- || Constructor ||
  constructor(
    private httpService: UserHttpService,
    private formBuilder: FormBuilder
  ) {}

  // ------------------------------------------------------------------------- || Variables + Objects ||
  form: FormGroup;

  // ------------------------------------------------------------------------------------- || Methods ||
  onLogin(): void {
    if (this.form.invalid) {
      return;
    }

    const email = this.form.value.email;
    const passwort = this.form.value.passwort;

    this.httpService.loginUser(email, passwort);

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
