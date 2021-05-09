import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../authentication/service/auth.service';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'ngx-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {
  gender={};
  customerId: string;
  stateList: any;
  cityList: any;
  isAdmin: boolean = false;
  customerForm =  this.fb.group({
    email: new FormControl(''),
    profilename: new FormControl(''),
    gender: new FormControl(''),
    mobileNo: new FormControl(''),
    address: new FormControl(''),
    state: new FormControl(''),
    city: new FormControl('')
  });
  constructor(private fb: FormBuilder, private customerService: CustomerService,
    protected router: Router,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.customerId = this.activatedRoute.snapshot.params.id;
    if(this.customerId) {
      this.customerService.customerDetails(this.customerId)
      .subscribe(result => {
        this.customerForm.patchValue(result);
      })
    }

    this.customerService.stateList()
    .subscribe(result => {
      this.stateList = result;
    })

    this.isAdmin = this.authService.isAdmin;
  }

  getCityList() {
    let state = this.customerForm.controls.state.value;
    this.customerService.cityList(state)
    .subscribe(result => {
      this.cityList = result;
    })
  }

  onSubmit() {
    // console.log(this.customerForm.value);

    if(this.customerId) {
      this.customerService.customerUpdate(this.customerId, this.customerForm.value)
      .subscribe(result => {
        this.router.navigate(['/pages/customer']);
      })
    }
  }

}
