import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{

  userData:any;
  ngOnInit(){
    this.userData = JSON.parse(sessionStorage.getItem('token') || '{}');
  }

  
}
