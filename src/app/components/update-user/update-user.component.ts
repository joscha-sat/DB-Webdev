import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UserHttpService } from 'src/app/services/user-http.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss'],
})
export class UpdateUserComponent implements OnInit {
  constructor(
    private httpService: UserHttpService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activeRouter: ActivatedRoute
  ) {}

  // ------------------------------------------------------------------------- || Variables + Objects ||
  form: FormGroup;

  user_id: number;

  rightPerson: boolean = true;

  user: User;

  loggedInUser: User;

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    const update_user: User = {
      user_id: this.user_id,
      name: this.form.value.name,
      email: this.form.value.email,
      password: this.form.value.password,
      date_of_birth: this.form.value.date_of_birth,
    };

    this.httpService.updateUser(update_user).subscribe();

    this.form.reset();
    this.router.navigate(['/Startseite']);
  }

  getLoggedInUser(): void {
    this.loggedInUser = this.httpService.getUser();
  }

  ngOnInit(): void {
    this.activeRouter.paramMap.subscribe((paramMap) => {
      if (paramMap.has('user_id')) {
        this.user_id = +paramMap.get('user_id');
        console.log(this.user_id);
        this.httpService.getUserById(this.user_id).subscribe((user) => {
          this.user = user[0];

          this.getLoggedInUser();
          if (this.user.user_id != this.loggedInUser.user_id) {
            this.rightPerson = false;
          }

          const date = new Date(this.user.date_of_birth);

          this.form.setValue({
            name: this.user.name,
            email: this.user.email,
            password: '',
            date_of_birth:
              date.getFullYear() +
              '-' +
              (date.getMonth() + 1) +
              '-' +
              date.getDate(),
          });
        });
      }
    });

    this.form = this.formBuilder.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required]],
      password: [null, [Validators.minLength(6)]],
      date_of_birth: [null, [Validators.required]],
    });
  }
}
