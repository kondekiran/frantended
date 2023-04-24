import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiServicesService } from 'src/app/service-API/api-services.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialogbox',
  templateUrl: './dialogbox.component.html',
  styleUrls: ['./dialogbox.component.scss']
})
export class DialogboxComponent implements OnInit{

cartSize = 1; 
userdata:any;
count = 3;
CartProducts:any;
productInfo = this.data; //userdata like id firstname


  constructor(
    public dialogRef:MatDialogRef<DialogboxComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any=[],
    private serviceapi:ApiServicesService,
    private toaster:ToastrService,
    private http:HttpClient,
    private router:Router
    ){}

    ngOnInit(){
      const sessionData = sessionStorage.getItem('token');
      this.userdata = JSON.parse(sessionData|| '{}');   
    }

    
  
    
  
   
    //close dash board and open cart
    backtohome(){
      this.dialogRef.close();
      this.router.navigate(['./user/cart'])
    }

    

    addProductsToCart(){
      var data = {
        productId:this.productInfo.id,
        quantity:this.cartSize,
        userId:this.userdata.id
      }
      this.serviceapi.addProductsToCarts(data).subscribe((res)=>{
        console.log(res);
        this.dialogRef.close();
        this.ForUpdateCartIconcount();
        this.toaster.success("Item added to your cart");
      })
       
    }

    ForUpdateCartIconcount(){
      this.serviceapi.getCartItemsbyuserId(this.userdata.id).subscribe((response)=>{
        this.CartProducts = response;
        this.updateCount(this.CartProducts.length);
      })  
    }

    updateCount(count:number) {
      this.serviceapi.updateCount(count);
    }

    
}
