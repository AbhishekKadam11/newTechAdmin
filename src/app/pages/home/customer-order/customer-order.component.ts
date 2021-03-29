import { Component, OnInit } from '@angular/core';
import { Contacts, RecentUsers, UserData } from '../../../@core/data/users';
import { takeWhile } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'ngx-customer-order',
  templateUrl: './customer-order.component.html',
  styleUrls: ['./customer-order.component.scss']
})
export class CustomerOrderComponent implements OnInit {
  
  private alive = true;
  contacts: any[];
  recent: any[];

  constructor(private userService: UserData) {
    forkJoin(
      this.userService.getContacts(),
      this.userService.getRecentUsers(),
    )
      .pipe(takeWhile(() => this.alive))
      .subscribe(([contacts, recent]: [Contacts[], RecentUsers[]]) => {
        this.contacts = contacts;
        this.recent = recent;
      });
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.alive = false;
  }

}
