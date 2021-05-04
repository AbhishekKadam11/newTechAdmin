import { AfterViewInit, Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { HomeService } from './home.service';

@Component({
  selector: 'ngx-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  dashboardCountDetails: any = {};
  orderStatisticDetails = [];
  orderByCustomerDetails: any = [];
  customerOrderCount: any = [];
  defaultColors = [
    "#665faac",
    "#dd8050c4",
    "#63adfeb3",
    "#24b044d9",
    "#ff516ed9",
    "#ffcf59ed"
  ];
  public data; 

  constructor(private homeService: HomeService) {
   
   }
  ngAfterViewInit(): void {
   
  }

  ngOnInit(): void {
    // forkJoin([this.homeService.dashboardCount(),
    // this.homeService.orderByCustomer()]).subscribe(results => {
    //   this.dashboardCountDetails = results[0];
    //   this.orderByCustomerDetails = results[1];

    //   console.log( this.dashboardCountDetails);
    // },error => {
    //   console.log(error);
    // });

    this.homeService.dashboardCount().subscribe(result => {
    
      this.dashboardCountDetails = result;
  
    })

    this.homeService.orderByCustomer().subscribe(result => {
      this.orderByCustomerDetails = result;
    })
   
    // this.orderStatisticDetails = this.data;
    this.homeService.orderCountByCustomer().subscribe(result => {
      let data = [];
      let count = 0;
      for (let i of result) {
        data.push({ "name": i["_id"], "value": i["myCount"], "color": this.defaultColors[count] })
        count++;
      }
      this.customerOrderCount = data;
  
    })

    this.homeService.orderStatistics().subscribe(result => {
      let data = [];
      for (let i of result) {
        data.push({"value": i["myCount"], "date": i["requestdate"] })
      }
      this.data = data;
    })
    

  }


}
