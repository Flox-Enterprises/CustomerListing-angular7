import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Product } from '../product'
// import * as $ from "jquery";

// declare var $:any;
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'prod_name', 'prod_desc', 'prod_price', 'action'];
  // data: Product[] = [];
  data;
  singleData;
  editId;
  isLoadingResults = true;

  productForm: FormGroup;
  editProductForm: FormGroup;
  prod_name: string = '';
  prod_desc: string = '';
  prod_price: number = null;
  updated_at: Date = null;
  // isLoadingResults = false;

  constructor(private router: Router,
    private api: ApiService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      'prod_name': [null, Validators.required],
      'prod_desc': [null, Validators.required],
      'prod_price': [null, Validators.required]
    });

    this.editProductForm = this.formBuilder.group({
      'prod_name': [null, Validators.required],
      'prod_desc': [null, Validators.required],
      'prod_price': [null, Validators.required]
    });

    this.api.getProducts()
      .subscribe(res => {
        this.data = res['data'];
        // console.log(this.data);
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });

  }

  getProds() {
    this.isLoadingResults = true;
    this.api.getProducts()
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
      this.api.updateProduct(id,form)
        .subscribe(res => {
          // let id = res['_id'];
          // console.log(res);
          // this.isLoadingResults = false;
          this.getProds();
          // this.router.navigate(['/products']);
        }, (err) => {
          console.log(err);
          // this.isLoadingResults = false;
        });
    }
    else {
      // this.isLoadingResults = true;
      this.api.addProduct(form)
        .subscribe(res => {
          // let id = res['_id'];
          // console.log(res);
          // this.isLoadingResults = false;
          this.getProds();
          this.productForm.reset();
          // $("#addProduct").hide();
          // this.router.navigate(['/products']);
        }, (err) => {
          console.log(err);
          // this.isLoadingResults = false;
        });
    }
  }

  editProd(id) {
    this.api.getProduct(id)
      .subscribe(res => {
        this.singleData = res['data'][0];
        this.editId = id;

        // console.log(this.singleData);
        this.editProductForm = this.formBuilder.group({
          'prod_name': [this.singleData.name, Validators.required],
          'prod_desc': [this.singleData.description, Validators.required],
          'prod_price': [this.singleData.price, Validators.required]
        });

        // this.isLoadingResults = false;
      }, err => {
        console.log(err);
        // this.isLoadingResults = false;
      });
  }

  deleteProd(id) {
    // console.log(id);
    this.api.deleteProduct(id)
      .subscribe(res => {
        // console.log(res);
        this.getProds();
      }, err => {
        console.log(err);
      });
  }

}
