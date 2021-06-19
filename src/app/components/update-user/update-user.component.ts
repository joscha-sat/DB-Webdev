import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UserHttpService } from 'src/app/services/user-http.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
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
user: User;
onSubmit(): void{
  
  if (this.form.invalid) {
    return;
  }

  const update_user: User = {
    user_id: this.user_id,
    name: this.form.value.name,
    email: this.form.value.email,
    password: this.form.value.password,
    date_of_birth: this.form.value.date_of_birth
   
  };

  this.httpService.updateUser(update_user).subscribe();

  this.form.reset();
  this.router.navigate(['/Startseite']);

}
  ngOnInit(): void {
    this.activeRouter.paramMap.subscribe( (paramMap) => {

      if(paramMap.has('user_id')){
        this.user_id= +paramMap.get('user_id');
        console.log(this.user_id);
        this.httpService.getUserById(this.user_id).subscribe( (user)=> {
          this.user=user[0];
          this.form.setValue({ 
            name: this.user.name, 
            email: this.user.email,
            date_of_birth: this.user.date_of_birth
          });
        } );
      }
    } );
    
    this.form = this.formBuilder.group({
      name: [null,[Validators.required]],
      email:  [null,[Validators.required]],
      password:  [null,[Validators.required]],
      date_of_birth:  [null,[Validators.required]]
    });
  }

}
