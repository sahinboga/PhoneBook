import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css']
})
export class UpdateCustomerComponent implements OnInit {
  updateCustomerForm:FormGroup
  customer:Customer
  customerId:number

  constructor(private customerService:CustomerService,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    //this.getCustomer()
  }

  // createCustomerEditForm() {
  //   this.updateCustomerForm = this.formBuilder.group({
  //     customerName: [this.customer.customerName, Validators.required],
  //     customerPhoneNumber: [this.customer.customerPhoneNumber, [Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
  //     customerBirthDate:[this.customer.customerBirthDate,Validators.required],
  //     customerDescription: [this.customer.customerDescription, Validators.required]
  //   })
  // }

  // getCustomer(){
  //   this.customerService.getCustomerById(this.customerId).subscribe(response => {
  //     this.customer = response.data//ToDo: Toast ile bilgilendir.
  //   })
  // }

  // updateUser() {
  //   if(this.updateCustomerForm.valid) {
  //     //let userId = this.localStorageService.GetUserId()
  //     let customerModel = Object.assign({id:this.customerId}, this.updateCustomerForm.value)
  //     console.log(customerModel)
  //     this.customerService.updateUser(customerModel).subscribe(response => {
  //       console.log(response)
  //       this.getCustomer()
  //     }, errorResponse => {
  //       console.log(errorResponse)
  //     })
  //   }
  //   else {
  //     this.toastrService.error("Bilgiler eksik.", "Hata")
  //   }
  // }
}
