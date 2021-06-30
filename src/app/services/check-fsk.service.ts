import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CheckFSKService {
  // --------------------------------------------------------------------------------- || Constructor ||
  constructor() {}

  // ------------------------------------------------------------------------- || Variables + Objects ||

  // ------------------------------------------------------------------------------------- || Methods ||

  checkFSK(date: Date, fsk: number): boolean {
    const today: Date = new Date();
    const vorFSKJahren: Date = new Date(
      today.getFullYear() - fsk,
      today.getMonth(),
      today.getDate()
    );

    const geburtsdatum = new Date(date);

    return geburtsdatum > vorFSKJahren;
  }

  // ------------------------------------------------------------------------------------- || @Inputs ||

  // ---------------------------------------------------------------------------------- || @ViewChild ||
}
