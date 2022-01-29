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
    this.createCustomerEditForm()
  }

  createCustomerEditForm() {
    this.updateCustomerForm = this.formBuilder.group({
      id: ["", Validators.required],
      customerName: ["", Validators.required],
      customerPhoneNumber: ["", [Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      customerBirthDate:["",Validators.required],
      customerDescription: ["", Validators.required]
    })
  }

  setCurrentCustomer(){
    this.updateCustomerForm.controls['id'].setValue(this.customer.id)
    this.updateCustomerForm.controls['customerName'].setValue(this.customer.customerName)
    this.updateCustomerForm.controls['customerPhoneNumber'].setValue(this.customer.customerPhoneNumber) 
    this.updateCustomerForm.controls['customerBirthDate'].setValue(this.customer.customerBirthDate) 
    this.updateCustomerForm.controls['customerDescription'].setValue(this.customer.customerDescription)  
  }

  updateCustomer() {
    if(this.updateCustomerForm.valid) {
      let customerModel:Customer = Object.assign({id:this.customer.id}, this.updateCustomerForm.value)
      console.log(customerModel)
      this.customerService.updateUser(customerModel).subscribe(response => {
        
        this.toastrService.success(response.message)
      }, responseError => {
        if(responseError.error.Errors.length>0){
          for (let i = 0; i <responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage
              ,"Hata")
          }       
        }
      })
    }
    else {
      this.toastrService.error("Bilgiler eksik.", "Hata")
    }
  }

}
