import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { GridJsConfig } from "gridjs-angular";
import { HttpClient } from '@angular/common/http';
import { GlobalShared } from '../../../app.global';
import { RowSelection } from "gridjs-selection";
import { h, html } from 'gridjs';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  public productList: any = [];

  constructor(private productService: ProductsService,
    private http: HttpClient, private globalShared: GlobalShared,
    protected router: Router) {
    this.productService.productList().subscribe(result => {
      this.productList = result;
    })

  }

  ngOnInit(): void {
  }

  //@ts-ignore
  public gridConfig: GridJsConfig = {
    columns: [{
      id: 'title',
      name: 'Title'
    }, {
      id: 'brand',
      name: 'Brand'
    }, {
      id: 'category',
      name: 'Category'
    }, {
      id: 'modalno',
      name: 'Modal no'
    }, {
      id: 'price',
      name: 'Price'
    },
    // {
    //   id: 'action',
    //   name: 'action',
    //   //@ts-ignore
    //   plugin: {
    //     // install the RowSelection plugin
    //     component: RowSelection,
    //     // RowSelection config
    //     props: {
    //       // use the "email" column as the row identifier
    //       id: (row) => row.cell(2).data
    //     }
    //   }
    // },
    {
      id: '_id',
      name: 'Actions',
      formatter: (cell, row) => {
        return h('button', {
          className: 'py-1 mb-2 px-2 border rounded-md viewButton',
          style: "background-image: linear-gradient(to right, #42aaff, #0095ff); border: none; box-shadow: 0 0 0 0 #006fd6, 0 0 0 0 #0057c2, 0 0 transparent;color: #ffffff;",
          onClick: () => {
            this.router.navigate(['/pages/products/details/', cell]);
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
      url: `${this.globalShared['apiUrl']}/productList`,
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

  // submit() {
  //   this.router.navigate(['/pages/products/details']);
  // }

}
