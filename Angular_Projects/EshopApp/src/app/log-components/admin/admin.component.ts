import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiServicesService } from 'src/app/service-API/api-services.service';




@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit{
  AllOrdersList:any;
  myGroup:any = FormGroup;
  OrdersStatus = ['Delivered','Dispatched','Canceled','Transit'];
  AdminInformation:any;
  ListOfCategories:any;
  AddProductsform:any = FormGroup;
constructor(
  private serviceAPI:ApiServicesService,
  private fb:FormBuilder,
  private toastr:ToastrService
){}
  ngOnInit(){
    this.GetTotalOrders();
    this.GetCategories();
    this.AddProducts();
    this.AdminInformation = JSON.parse(sessionStorage.getItem('token')|| '');
   this.myGroup = this.fb.group({
    status:['']
   })
  }
  displayedColumnsList: string[] = ['orderId', 'firstName', 'productName', 'quantity','totalPrice','orderStatus','orderDate','Update'];
  GetTotalOrders(){
    this.serviceAPI.GetTotalOrdersList().subscribe((res)=>{
      this.AllOrdersList = res;
    })
  }
  GetCategories(){
    this.serviceAPI.GetCategoryList().subscribe((res)=>{this.ListOfCategories = res;});
  }


  upadateStatus(element:any){
    var orderstatus = this.myGroup.get('status').value;
    if(orderstatus == ''){
      this.toastr.error("Choose Status Value");
    }else{
      var data ={
        orderId:element.orderId,
        status:orderstatus
      }
      this.serviceAPI.UpdateOrderStatus(data).subscribe((res)=>{
        this.toastr.success("Order Status Updated");
        this.GetTotalOrders();
      })

    }    
  }
 
  logout(){
    this.serviceAPI.logout();
  }

  //add products
    AddProducts(){
      this.AddProductsform = this.fb.group({
        name:['',Validators.required],
        Manufacturer:['',Validators.required],
        price:['',Validators.required],
        Discount:['',Validators.required],
        Quantity:['',Validators.required],
        ImageURL:['',Validators.required],
        category:['',Validators.required]
      })
    }

    InsertProduct(){
      console.log(this.AddProductsform);
      let data= {
        categoryId:this.AddProductsform.get('category').value,
        productName:this.AddProductsform.get('name').value,
        manufacturer:this.AddProductsform.get('Manufacturer').value,
        unitPrice:this.AddProductsform.get('price').value,
        discount:this.AddProductsform.get('Discount').value,
        quantity:this.AddProductsform.get('Quantity').value,
        imageURL:this.AddProductsform.get('ImageURL').value
      }
      this.serviceAPI.AddProducts(data).subscribe((response)=>{
        this.toastr.success("Item added Successfully");
      },
      (error)=>{
        this.toastr.error(error);
      })
    }
}
