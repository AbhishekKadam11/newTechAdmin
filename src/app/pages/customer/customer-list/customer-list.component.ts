import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { h } from 'gridjs';
import { GlobalShared } from '../../../app.global';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'ngx-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {

  public customerList: any = [];

  constructor(private http: HttpClient, private globalShared: GlobalShared,
    private customerService: CustomerService,
    protected router: Router) {

    this.customerService.productList().subscribe(result => {
      this.customerList = result;
    })
  }

  ngOnInit(): void {
  }

  //@ts-ignore
  public gridConfig: GridJsConfig = {
    columns: [{
      id: 'profilename',
      name: 'Name',
      default: 'Not Specified'
    }, {
      id: 'email',
      name: 'Email'
    }, {
      id: 'mobileNo',
      name: 'Mobile No'
    }, {
      id: 'createdAt',
      name: 'Created At'
    },
    {
      id: '_id',
      name: 'Actions',
      formatter: (cell, row) => {
        return h('button', {
          className: 'py-1 mb-2 px-2 border rounded-md viewButton',
          style: "background-image: linear-gradient(to right, #42aaff, #0095ff); border: none; box-shadow: 0 0 0 0 #006fd6, 0 0 0 0 #0057c2, 0 0 transparent;color: #ffffff;",
          onClick: () => {
            this.router.navigate(['/pages/customer/details/', cell]);
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
      url: `${this.globalShared['apiUrl']}/customerList`,
      then: data => data[0]['data'],
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
