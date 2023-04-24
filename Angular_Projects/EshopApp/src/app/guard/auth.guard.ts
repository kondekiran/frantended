import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiServicesService } from '../service-API/api-services.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router:Router,
    private apiservice:ApiServicesService
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if(!this.apiservice.isLoggedIn){
        this.router.navigate(['login']);
        return false;
     
      }
        return this.apiservice.isLoggedIn();
      

  
  }
  
}
