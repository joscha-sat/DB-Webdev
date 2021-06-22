import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

import { MovieBuyTicketComponent } from '../movie-buy-ticket.component';

@Component({
  selector: 'app-buy-page',
  templateUrl: './buy-page.component.html',
  styleUrls: ['./buy-page.component.scss'],
})
export class BuyPageComponent implements OnInit {
  // --------------------------------------------------------------------------------- || Constructor ||
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  // ------------------------------------------------------------------------- || Variables + Objects ||

  // ------------------------------------------------------------------------------------- || Methods ||

  add(): void {
    const childComponent =
      this.componentFactoryResolver.resolveComponentFactory(
        MovieBuyTicketComponent
      );
    this.componentRef = this.target.createComponent(childComponent);
  }

  // ------------------------------------------------------------------------------------- || @Inputs ||

  // ---------------------------------------------------------------------------------- || @ViewChild ||

  @ViewChild('parent', { read: ViewContainerRef }) target: ViewContainerRef;

  private componentRef: ComponentRef<any>;

  // ------------------------------------------------------------------------------------ || ngOnInit ||
  ngOnInit(): void {}
}
