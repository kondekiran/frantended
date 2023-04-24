import { Component, OnInit } from '@angular/core';
import { ApiServicesService } from 'src/app/service-API/api-services.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogboxComponent } from '../dialogbox/dialogbox.component';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  //Image slider

  images = [
    { path: 'https://c0.wallpaperflare.com/preview/378/243/705/ecommerce-internet-marketing-online.jpg' },
    { path: '../../../../../assets/Images/51ovs76vmtL._SX3000_.jpg' },
    { path: '../../../../../assets/Images/books.jpg' },
    { path: '../../../../../assets/Images/Electronics-keyboard.jpg' },
    { path: '../../../../../assets/Images/Electronics-mouse.jpg' },
    { path: '../../../../../assets/Images/Hp.jpg' },
    { path: '../../../../../assets/Images/Lenovo.jpg' },
    { path: '../../../../../assets/Images/watch.jpg' }
  ];

  //list of products
  AllProductsList: any;
  CartSize: any;
  user: any;
  lengthofCart: any;

  constructor(
    private serviceapi: ApiServicesService,
    private dialog: MatDialog
  ) { }
  ngOnInit() {
    var userdata = sessionStorage.getItem('token');
    this.user = JSON.parse(userdata || '');
    this.DisplayData();
  }

  //Display all products in the home page
  DisplayData() {
    this.serviceapi.allProductsList().subscribe((res) => {
      this.AllProductsList = res;
      console.log(res);
    });
    //for cartSize
    this.serviceapi.getCartItemsbyuserId(this.user.id).subscribe((response) => {
      this.CartSize = response;
      this.lengthofCart = JSON.parse(this.CartSize.length);
      this.updateCount(this.lengthofCart);
    });


  }

  getProductsByCategory(i: number) {

    this.serviceapi.productsListbyCategoryId(i).subscribe((response) => {
      this.AllProductsList = response;
      console.log(response);

    })
  }
  getAllProducts() {
    this.DisplayData();
  }

  //open dialogbox
  openProductDialogbox(item: any) {
    let dialogRef = this.dialog.open(DialogboxComponent, {
      width: '60%',
      height: '90%',
      data: item
    })
  }
  //display cartsize in header
  updateCount(count: number) {
    this.serviceapi.updateCount(count);
  }

}
