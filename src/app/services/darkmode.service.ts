import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DarkmodeService {
  // HTML - DOM Elemente holen und abspeichern
  darkMode: string | null = localStorage.getItem('darkMode');

  // Darkmode aktivieren
  enableDarkMode(): void {
    document.body.classList.add('dark');
    localStorage.setItem('darkMode', 'enabled');
  }

  // Darkmode deaktivieren
  disableDarkMode(): void {
    document.body.classList.remove('dark');
    localStorage.setItem('darkMode', '');
  }

  darkModeToggleF(): void {
    this.darkMode = localStorage.getItem('darkMode');

    if (this.darkMode !== 'enabled') {
      this.enableDarkMode();
    } else {
      this.disableDarkMode();
    }
  }
}
