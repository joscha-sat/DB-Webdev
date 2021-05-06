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
  constructor(private http: HttpService) {}

  asyncUsers: Observable<Kunde[]> = this.http.getUsers();

  ngOnInit(): void {}
}
