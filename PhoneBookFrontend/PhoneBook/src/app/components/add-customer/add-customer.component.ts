import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {

  addCustomerForm:FormGroup
  constructor(private customerService:CustomerService,
              private formBuilder:FormBuilder) { }

  ngOnInit(): void {
  }
  
  createCustomerAddForm() {
    this.addCustomerForm = this.formBuilder.group({
      customerName: ["", Validators.required],
      customerPhoneNumber: ["", Validators.required],
      customerBirthDate:["",Validators.required],
      customerDescription: ["", Validators.required]
    })
  }
}
