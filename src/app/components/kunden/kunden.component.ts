import { Component, OnInit } from '@angular/core';
import { Kunde } from 'src/app/interfaces/kunde';
import { KundeHttpService } from 'src/app/services/kunde-http.service';

@Component({
  selector: 'app-kunden',
  templateUrl: './kunden.component.html',
  styleUrls: ['./kunden.component.scss'],
})
export class KundenComponent implements OnInit {
  // ------------------------------------------------------------------------------------ || Constructor ||
  constructor(private http: KundeHttpService) {}

  // ------------------------------------------------------------------------------------ || Variables + Objects ||

  kunden: Kunde[];

  // ------------------------------------------------------------------------------------ || Methods ||

  getAlleKunden(): void {
    this.http.getUsers().subscribe((k) => (this.kunden = k));
  }

  // ------------------------------------------------------------------------------------ || ngOnInit ||

  ngOnInit(): void {
    // Kunden beim laden der Component ausgeben lassen
    this.getAlleKunden();
    // Kunden-Array updaten, wenn veränderungen passieren
    this.http.updater$.subscribe(() => {
      this.getAlleKunden();
    });
  }
}
