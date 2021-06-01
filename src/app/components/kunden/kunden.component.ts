import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
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

  users: User[];

  ueber18(date: Date): string {
    const today: Date = new Date();
    const vor18Jahren: Date = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate()
    );

    const geburtsdatum = new Date(date);

    if (geburtsdatum < vor18Jahren) {
      return 'Ja';
    }
    return 'Nein';
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
