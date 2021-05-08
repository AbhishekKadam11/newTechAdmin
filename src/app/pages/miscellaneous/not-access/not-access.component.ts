import { Component, OnInit } from '@angular/core';
import { NbMenuService } from '@nebular/theme';

@Component({
  selector: 'ngx-not-access',
  templateUrl: './not-access.component.html',
  styleUrls: ['./not-access.component.scss']
})
export class NotAccessComponent implements OnInit {

  constructor(private menuService: NbMenuService) { }

  ngOnInit(): void {
  }

  goToHome() {
    this.menuService.navigateHome();
  }

}
