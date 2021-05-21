import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { h } from 'gridjs';
import { GlobalShared } from '../../../app.global';
import { OrdersService } from '../orders.service';
import { ProductOrderListComponent } from '../product-order-list/product-order-list.component';

@Component({
  selector: 'ngx-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit {

  public orderList: any = [];
  constructor(private globalShared: GlobalShared, protected router: Router,
    private ordersService: OrdersService,
    private toastrService: NbToastrService,
    private dialogService: NbDialogService) { }

  ngOnInit(): void {
  }

   //@ts-ignore
   public gridConfig: GridJsConfig = {
    columns: [{
      id: 'orderId',
      name: 'Order Id',
      default: 'Not Specified'
    }, {
      id: 'profilename',
      name: 'Name'
    }, {
      id: 'email',
      name: 'Email'
    }, {
      id: 'mobileNo',
      name: 'Mobile No'
    },, {
      id: 'totalamount',
      name: 'Amount'
    }, {
      id: 'requestdate',
      name: 'Request Date'
    },
    {
      id: 'productDetails',
      name: 'Actions',
      formatter: (cell, row) => {
        return h('button', {
          className: 'py-1 mb-2 px-2 border rounded-md viewButton',
          style: "background-image: linear-gradient(to right, #42aaff, #0095ff); border: none; box-shadow: 0 0 0 0 #006fd6, 0 0 0 0 #0057c2, 0 0 transparent;color: #ffffff;",
          onClick: () => {
            if (cell.length !== 0) {
              this.ordersService.getCombinedFileData(cell).subscribe(data => {
                // console.log('getCombinedFileData', data);
              })
              this.dialogService.open(ProductOrderListComponent, {
                context: {
                  title: 'Customer order list',
                  data: cell,
                },
              });
            } else {
              this.toastrService.warning(
                "Something went wrong",
                `Error`);
            }
          }
        }, 'View');
      }
    },
    ],
    pagination: {
      enabled: true,
      limit: 10,
      server: {
        url: (prev, page, limit) => `${prev}?page=${page}&limit=${limit}`
      }
    },
    server: {
      url: `${this.globalShared['apiUrl']}/orderList`,
      then: data =>{
         data[0]['data'].map(item=>{
           item['orderId'] = item['orderId'];
           item['profilename'] = item['customerDetails'] ? item['customerDetails']['profilename'] :  "Not specified";
           item['email'] = item['customerDetails'] ? item['customerDetails']['email'] : "Not specified";
           item['mobileNo'] = item['customerDetails'] ? item['customerDetails']['mobileNo'] : "Not specified";
           item['totalamount'] = item['totalamount'];
           item['requestdate'] = item['requestdate'];
           item['productDetails'] = item['productDetails'];
           return item;
         })
         return data[0]['data'];
        },
      total: data => data[0].metadata[0]['total']
    }
  };

  handleCellClick(event: any) {
    //   console.log("cellClicked", event);
  }

  handleRowClick(event: any) {
    //  console.log("rowClicked", event);
  }

  handleBeforeLoad(event: any) {
    // console.log("beforeLoad", event);
  }

  handleGridLoad(event: any) {
    //  console.log("load", event);
  }

}
