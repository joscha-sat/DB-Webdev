import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  // --------------------------------------------------------------------------------- || Constructor ||
  constructor() {}

  // ------------------------------------------------------------------------- || Variables + Objects ||

  form: FormGroup;

  // ------------------------------------------------------------------------------------- || Methods ||

  // ------------------------------------------------------------------------------------- || @Inputs ||

  // ---------------------------------------------------------------------------------- || @ViewChild ||

  // ------------------------------------------------------------------------------------ || ngOnInit ||
  ngOnInit(): void {}
}
