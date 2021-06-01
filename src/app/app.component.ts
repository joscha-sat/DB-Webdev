import { Component, OnInit } from '@angular/core';
import { UserHttpService } from './services/user-http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private loginService: UserHttpService) {}

  ngOnInit(): void {
    this.loginService.autoAuthUser();
  }
}
