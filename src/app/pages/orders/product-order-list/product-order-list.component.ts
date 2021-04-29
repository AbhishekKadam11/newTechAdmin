import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { GlobalShared } from '../../../app.global';

@Component({
  selector: 'ngx-product-order-list',
  templateUrl: './product-order-list.component.html',
  styleUrls: ['./product-order-list.component.scss']
})
export class ProductOrderListComponent implements OnInit {

  @Input() title: string;
  @Input() data: any;
  imgUrl: string = this.globalShared['imageUrl'];
  constructor(protected ref: NbDialogRef<ProductOrderListComponent>,private globalShared: GlobalShared) { }

  ngOnInit(): void {
    // console.log("data", this.data);
  }

  close() {
    this.ref.close();
  }

}
