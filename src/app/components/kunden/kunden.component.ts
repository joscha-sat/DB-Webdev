import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Kunde } from 'src/app/interfaces/kunde';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-kunden',
  templateUrl: './kunden.component.html',
  styleUrls: ['./kunden.component.scss'],
})
export class KundenComponent implements OnInit {
  // --------------------------------------------------------------------------------- || Constructor ||
  constructor(private http: HttpService) {}

  // ------------------------------------------------------------------------- || Variables + Objects ||

  //  mit Keyword | async in HTML

  asyncUsers: Observable<Kunde[]> = this.http.getUsers();

  // ------------------------------------------------------------------------------------ || ngOnInit ||

  ngOnInit(): void {}
}
