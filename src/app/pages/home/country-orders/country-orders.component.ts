import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpoint, NbMediaBreakpointsService, NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';
import { CountryOrderData } from '../../../@core/data/country-order';
import { HomeService } from '../home.service';

@Component({
  selector: 'ngx-country-orders',
  styleUrls: ['./country-orders.component.scss'],
  template: `
    <nb-card [size]="breakpoint.width >= breakpoints.md ? 'medium' : 'giant'">
      <nb-card-header>Country Orders Statistics</nb-card-header>
      <nb-card-body>
        <ngx-country-orders-map (select)="selectStateById($event)"
                                stateId="Maharashtra">
        </ngx-country-orders-map>
        <ngx-country-orders-chart [stateName]="stateName"
                                  [data]="stateData"
                                  [labels]="stateCategories"
                                  maxValue="20">
        </ngx-country-orders-chart>
      </nb-card-body>
    </nb-card>
  `,
})
export class CountryOrdersComponent implements OnInit, OnDestroy {

  private alive = true;

  stateName = '';
  stateData: number[] = [];
  stateCategories: any=[];
  breakpoint: NbMediaBreakpoint = { name: '', width: 0 };
  breakpoints: any;

  constructor(private themeService: NbThemeService,
              private breakpointService: NbMediaBreakpointsService,
              private homeService: HomeService,
              private countryOrderService: CountryOrderData) {
    this.breakpoints = this.breakpointService.getBreakpointsMap();
    
  }

  ngOnInit() {
    this.themeService.onMediaQueryChange()
      .pipe(takeWhile(() => this.alive))
      .subscribe(([oldValue, newValue]) => {
        this.breakpoint = newValue;
      });
      
    // this.countryOrderService.getCountriesCategories()
    //   // .pipe(takeWhile(() => this.alive))
    //   .subscribe((stateCategories) => {
    //     console.log("stateCategories",stateCategories)
    //     this.stateCategories = stateCategories;
    //   });
    
    // this.homeService.stateWiseCount("Maharashtra")
    // .pipe(takeWhile(() => this.alive))
    // .subscribe((stateData) => {
    //   let data = [];
    //   if(stateData.length > 0) {
    //     for(let i = 0; i< stateData.length; i++) {
    //       data.push(stateData[i]['_id']);
    //     }
    //     this.stateCategories = data;
    //   }
    // });
  }

  selectStateById(stateName: string) {
    this.stateName = stateName;
    // console.log("stateName ",stateName)
    // this.countryOrderService.getCountriesCategoriesData(stateName)
    //   .pipe(takeWhile(() => this.alive))
    //   .subscribe((stateData) => {
    //     console.log("stateData", stateData)
    //     this.stateData = stateData;
    //   });
    let data = []
    let label = []
    this.homeService.stateWiseCount(stateName)
      // .pipe(takeWhile(() => this.alive))
      .subscribe((stateData) => {
       
        // this.stateData = stateData;
        if(stateData.length > 0) {
          for(let i = 0; i< stateData.length; i++) {
            label.push(stateData[i]['_id']);
            data.push(stateData[i]['myCount']);
          }
          this.stateData = data;
          this.stateCategories = label;
        }
      });

  }

  ngOnDestroy() {
    this.alive = false;
  }
}
