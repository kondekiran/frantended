import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiServicesService } from 'src/app/service-API/api-services.service';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  loginform:any = FormGroup;
  invalidUser = true;
  invalidform = false;
  



  //constructor
  constructor(
    private formbuilder:FormBuilder,
    private apiservices:ApiServicesService,
    private router:Router,
    private toastr:ToastrService
  ){}

  ngOnInit(){
    this.loginFormBuild();
    if(this.apiservices.isLoggedIn()){
      this.router.navigate(['user']);
    }
  }

  loginFormBuild(){
    this.loginform = this.formbuilder.group({
      username:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(4)]]
    })
  }
  // //Checking valid user or not
  // checkValidUser(){
  //   return this.apiservices.isLoggedIn();
  // }

  onSubmit(){
    if(this.loginform.valid){
      var data={
        email:this.loginform.get('username').value,
        password:this.loginform.get('password').value
      }
     this.apiservices.login(data);
    //  this.invalidUser = this.checkValidUser();
     
    }else{
      this.invalidform = true;
      this.toastr.error("Invalid User datails");
    }

  }
}
