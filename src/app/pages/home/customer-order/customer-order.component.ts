import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Contacts, RecentUsers, UserData } from '../../../@core/data/users';
import { takeWhile } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-customer-order',
  templateUrl: './customer-order.component.html',
  styleUrls: ['./customer-order.component.scss']
})
export class CustomerOrderComponent implements OnInit {
  
  @Input() public data:[];
  loading = true;
  private alive = true;
  contacts: any[];
  recent: any[];

  constructor(private userService: UserData, protected router: Router) {
  // console.log(" this.loading", this.loading)
    // forkJoin(
    //   this.userService.getContacts(),
    //   this.userService.getRecentUsers(),
    // )
    //   .pipe(takeWhile(() => this.alive))
    //   .subscribe(([contacts, recent]: [Contacts[], RecentUsers[]]) => {
    //     this.contacts = contacts;
    //     this.recent = recent;
    //   });
     
  }

  ngOnChanges(changes: SimpleChanges) {
    // only run when property "data" changed
    if (changes['data'] && this.data.length > 0) {
      //  console.log("this.data",this.data)
       this.loading = false;
      //  console.log(" this.loading", this.loading)
    }
}

  ngOnInit(): void {
  }

  customerDetails(cid: string){
    this.router.navigate(['/pages/customer/details/', cid]);
  }

  ngOnDestroy() {
    this.alive = false;
  }

}
