import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  displayedColumns: string[] = ['id', 'cust_name', 'cust_address', 'action'];
  // data: Product[] = [];
  data;
  singleData;
  editId;
  isLoadingResults = true;

  customerForm: FormGroup;
  editCustomerForm: FormGroup;
  prod_name: string = '';
  prod_desc: string = '';
  prod_price: number = null;
  updated_at: Date = null;

  constructor(private router: Router,
    private api: ApiService,
    private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.customerForm = this.formBuilder.group({
      'cust_name': [null, Validators.required],
      'cust_address': [null, Validators.required]
    });

    this.editCustomerForm = this.formBuilder.group({
      'cust_name': [null, Validators.required],
      'cust_address': [null, Validators.required]
    });

    this.api.getCustomers()
      .subscribe(res => {
        this.data = res['data'];
        // console.log(this.data);
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

  onFormSubmit(form: NgForm, id) {
    // console.log(form);

    if (id) {
      // this.isLoadingResults = true;
      this.api.updateCustomer(id, form)
        .subscribe(res => {
          // let id = res['_id'];
          // console.log(res);
          // this.isLoadingResults = false;
          this.getCusts();
          // this.router.navigate(['/products']);
        }, (err) => {
          console.log(err);
          // this.isLoadingResults = false;
        });
    }
    else {
      // this.isLoadingResults = true;
      this.api.addCustomer(form)
        .subscribe(res => {
          // let id = res['_id'];
          // console.log(res);
          // this.isLoadingResults = false;
          this.getCusts();
          this.customerForm.reset();
          // $("#addProduct").hide();
          // this.router.navigate(['/products']);
        }, (err) => {
          console.log(err);
          // this.isLoadingResults = false;
        });
    }
  }

  getCusts() {
    this.isLoadingResults = true;

    this.api.getCustomers()
      .subscribe(res => {
        this.data = res['data'];
        // console.log(this.data);
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

  editCust(id) {
    this.api.getCustomer(id)
      .subscribe(res => {
        this.singleData = res['data'][0];
        this.editId = id;

        // console.log(this.singleData);
        this.editCustomerForm = this.formBuilder.group({
          'cust_name': [this.singleData.name, Validators.required],
          'cust_address': [this.singleData.address, Validators.required]
        });

        // this.isLoadingResults = false;
      }, err => {
        console.log(err);
        // this.isLoadingResults = false;
      });
  }

  deleteCust(id) {
    // console.log(id);
    this.api.deleteCustomer(id)
      .subscribe(res => {
        // console.log(res);
        this.getCusts();
      }, err => {
        console.log(err);
      });
  }


}
