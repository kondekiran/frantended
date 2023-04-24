import { Component, OnInit } from '@angular/core';
import { ApiServicesService } from 'src/app/service-API/api-services.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  constructor(
    private serviceAPI: ApiServicesService,
    private router:Router,
    private toastr:ToastrService
  ) { }
  cartItemsData: any;
  Userid: any;
  UserAddress: any;
  newArray:object[]= new Array();
  ngOnInit(): any {
    var cartdata = sessionStorage.getItem('cartItems');
    var user = sessionStorage.getItem('token');
    var orderdata = sessionStorage.getItem('orderItems');
    this.Userid = JSON.parse(user || '{}');
    this.cartItemsData = JSON.parse(cartdata || '{}');
    this.newArray = JSON.parse(orderdata||'{}');
    // console.log(this.Userid);
    // console.log(this.cartItemsData);
    
    console.log(this.newArray);
    this.GetUserInformation();
  }
  GetUserInformation() {
    this.serviceAPI.getUserDatabyId(this.Userid.id).subscribe((res) => {
      this.UserAddress = res;
      // console.log(res);
    })
  }
  placeOrder(){
    this.serviceAPI.AddProductstoOrders(this.newArray).subscribe((response)=>{
      // console.log(response);
      // console.log(this.newArray);
    })
    this.serviceAPI.DeleteAllProductsInCarts(this.Userid.id).subscribe((res)=>{
      console.log('deleted');
      
    })
    this.toastr.success('Order Placed');
    this.updateCount(0);
    this.router.navigate(['user/home']);
  }

  updateCount(count:number) {
    this.serviceAPI.updateCount(count);
  }

}
