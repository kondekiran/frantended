import { Component, OnInit } from '@angular/core';
import { ApiServicesService } from 'src/app/service-API/api-services.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit{
  
UserId:any;
OrdersList:any;



  constructor(
    private serviceAPI:ApiServicesService
  ){}

  ngOnInit() {
    var user = sessionStorage.getItem('token');
    this.UserId = JSON.parse(user || '');
    this.GetOrdersList();
  }
  displayedColumns: string[] = ['orderId', 'imageURL', 'productName', 'unitPrice','discount','quantity','total','orderStatus','orderDate'];


  GetOrdersList(){
    this.serviceAPI.GetUserOrderedProducts(this.UserId.id).subscribe((response)=>{
      this.OrdersList = response;
    })
  }
  

  
}
