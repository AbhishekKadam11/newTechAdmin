import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-customer',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
