import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiServicesService } from 'src/app/service-API/api-services.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm:any = FormGroup;
constructor(
  private formbuilder:FormBuilder,
  private apiservice:ApiServicesService,
  private router:Router,
  private toaster:ToastrService
){}


ngOnInit(){
  this.registerFormBuild();
}

registerFormBuild(){
  this.registerForm = this.formbuilder.group({
    firstName:['',[Validators.required]],
    lastName:['',[Validators.required]],
    Email:['',[Validators.required,Validators.email]],
    Password:['',[Validators.required,Validators.minLength(4)]],
    phone:['',[Validators.required,Validators.minLength(10),Validators.maxLength(12)]],
    address:['',[Validators.required]],
    type:['',[Validators.required]]
  })
}

onSubmitRegForm(){
  console.log(this.registerForm.value);
  if(this.registerForm.valid){
    var data = {
      firstName:this.registerForm.get('firstName').value,
      lastName:this.registerForm.get('lastName').value,
      password:this.registerForm.get('Password').value,
      email:this.registerForm.get('Email').value,
      phone:this.registerForm.get('phone').value,
      address:this.registerForm.get('address').value,
      type:this.registerForm.get('type').value
    }
    this.apiservice.registerdata(data).subscribe((res)=>{
     
      this.toaster.success("Register successfully");
      console.log(res);
      this.router.navigate(['login']);
    },
    (Error)=>{
      
      this.toaster.error("Email address already exist");
      console.log(Error)
    })
  }
}


}
