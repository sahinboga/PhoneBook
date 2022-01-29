import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {

  customers:Customer[]=[]
  addCustomerForm:FormGroup
  constructor(private customerService:CustomerService,
              private formBuilder:FormBuilder,
              private toastrService:ToastrService) { }

  ngOnInit(): void {
    //this.getCustomers()
    this.createCustomerAddForm()
  }
  
  createCustomerAddForm() {
    this.addCustomerForm = this.formBuilder.group({
      customerName: ["", Validators.required],
      customerPhoneNumber: ["", [Validators.required,Validators.maxLength(14)]],
      customerBirthDate:["",Validators.required],
      customerDescription: ["", Validators.required]
    })
  }
  
  // getCustomers(){
  //   this.customerService.getCustomers().subscribe(response=>{
  //     this.customers=response.data
  //   })
  // }

  add(){
    if(this.addCustomerForm.valid){
      let customerModel = Object.assign({},this.addCustomerForm.value)
      this.customerService.add(customerModel).subscribe(response=>{
        this.toastrService.success(response.message)
        //this.getCustomers()
      },responseError=>{
        if(responseError.error.Errors.length>0){
          for (let i = 0; i <responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage
              ,"Hata")
          }       
        } 
      })
      
    }else{
      this.toastrService.error("Formunuz eksik","Dikkat")
    }
    
  }
}
