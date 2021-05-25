import { Component, OnInit } from '@angular/core';
import { Kunde } from 'src/app/interfaces/kunde';
import { KundeHttpService } from 'src/app/services/kunde-http.service';

@Component({
  selector: 'app-kunden',
  templateUrl: './kunden.component.html',
  styleUrls: ['./kunden.component.scss'],
})
export class KundenComponent implements OnInit {
  // --------------------------------------------------------------------------------- || Constructor ||
  constructor(private http: KundeHttpService) {}

  // --------------------------------------------------------------------------------- || Variables + Objects ||

  users: Kunde[];

  ueber18(): void {
    const users: Kunde[] = this.users;
    const today: Date = new Date();
    const vor18Jahren: Date = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate()
    );

    let i: number;

    for (i = 0; i < users.length; i++) {
      const geburtsdatum = new Date(users[i].geburtsdatum);
      console.log(geburtsdatum < vor18Jahren);
    }
  }

  // ------------------------------------------------------------------------------------ || methods ||

  getAllUsers(): void {
    this.http.getUsers().subscribe((user) => (this.users = user));
  }

  // ------------------------------------------------------------------------------------ || ngOnInit ||

  ngOnInit(): void {
    this.getAllUsers();
  }
}
