import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})

export class CustomerComponent implements OnInit {
  customers:Customer[]=[]
  customer:Customer
  updateCustomerForm:FormGroup
  filterText:""
  currentCustomer:Customer
  
  constructor(private customerService:CustomerService,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getCustomers()
    this.createCustomerEditForm()
  }

  // Kişi listeleme
  getCustomers(){
    this.customerService.getCustomers().subscribe(response=>{
      this.customers=response.data
    })
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

  setCurrentCustomer(customer:Customer){
    this.currentCustomer=customer
    //console.log(this.currentCustomer)
    this.updateCustomerForm.controls['id'].setValue(this.currentCustomer.id)
    this.updateCustomerForm.controls['customerName'].setValue(this.currentCustomer.customerName)
    this.updateCustomerForm.controls['customerPhoneNumber'].setValue(this.currentCustomer.customerPhoneNumber) 
    this.updateCustomerForm.controls['customerBirthDate'].setValue(this.currentCustomer.customerBirthDate) 
    this.updateCustomerForm.controls['customerDescription'].setValue(this.currentCustomer.customerDescription)  
    
  }

  //Kişi güncelleme
  updateCustomer() {
    if(this.updateCustomerForm.valid) {
      let customerModel:Customer = Object.assign({}, this.updateCustomerForm.value)
      console.log(customerModel)
      this.customerService.updateUser(customerModel).subscribe(response => {
        // console.log(response)
        this.toastrService.success(response.message)
        
        this.getCustomers()
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

  // Kişi Silme
  deleteCustomer(customer:Customer) {
    Swal.fire({
      title: 'Emin misin?',
      text:"Kişi silinecek",
      icon:'warning',
      showCancelButton: true,
      cancelButtonText:"İptal",
      showConfirmButton: false,
      showDenyButton: true,
      denyButtonText:"Evet, Sil"
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isDenied) {
        this.customerService.deleteCustomer(customer).subscribe(response => {
          Swal.fire('Silindi!', '', 'success')
          this.getCustomers()
        }, responseError => {
          if(responseError.error.Errors.length>0){
            for (let i = 0; i <responseError.error.Errors.length; i++) {
              this.toastrService.error(responseError.error.Errors[i].ErrorMessage
                ,"Hata")
            }       
          }
        })
      }
    })
  }
  
}
