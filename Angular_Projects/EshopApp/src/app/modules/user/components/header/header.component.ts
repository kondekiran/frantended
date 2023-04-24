import { Component, OnInit } from '@angular/core';
import { ApiServicesService } from 'src/app/service-API/api-services.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

constructor(
  public serviceAPI : ApiServicesService
){}

userData:any;
userId:any;
ngOnInit(){
  var data = sessionStorage.getItem('token');
  this.userId = JSON.parse(data || '{}');
  this.serviceAPI.getUserDatabyId(this.userId.id).subscribe((res)=>{
    this.userData = res;

  })
}
  logout(){
    this.serviceAPI.logout();
  }

}
