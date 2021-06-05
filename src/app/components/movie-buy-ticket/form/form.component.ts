import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  // --------------------------------------------------------------------------------- || Constructor ||
  constructor(private formBuilder: FormBuilder) {}

  // ------------------------------------------------------------------------- || Variables + Objects ||

  form: FormGroup;

  // ------------------------------------------------------------------------------------- || Methods ||

  // ------------------------------------------------------------------------------------- || @Inputs ||

  // ---------------------------------------------------------------------------------- || @ViewChild ||

  // ------------------------------------------------------------------------------------ || ngOnInit ||
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      letter: ['', []],
      number: ['', []],
    });
  }
}
