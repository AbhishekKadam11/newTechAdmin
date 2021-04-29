import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-orders',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
