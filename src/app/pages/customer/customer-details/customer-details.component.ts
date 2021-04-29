import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'ngx-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {
  gender={};
  customerId: string;
  customerForm =  this.fb.group({
    email: new FormControl(''),
    profilename: new FormControl(''),
    gender: new FormControl(''),
    mobileNo: new FormControl(''),
    address: new FormControl('')
  });
  constructor(private fb: FormBuilder, private customerService: CustomerService,
    protected router: Router,
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
