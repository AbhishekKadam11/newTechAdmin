import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'

@Component({
  selector: 'ngx-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {
  gender={}
  customerForm =  this.fb.group({
    email: new FormControl(''),
    profileName: new FormControl(''),
    gender: new FormControl(''),
    mobileNo: new FormControl(''),
    address: new FormControl('')
  });
  constructor(private fb: FormBuilder) {
    
   }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.customerForm.value);
  }

}
