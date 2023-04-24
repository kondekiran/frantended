import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { NgImageSliderModule } from 'ng-image-slider';
import { DialogboxComponent } from './components/dialogbox/dialogbox.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CartComponent } from './components/cart/cart.component';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { PaymentsComponent } from './components/payments/payments.component';
import { OrdersComponent } from './components/orders/orders.component';
import {MatTableModule} from '@angular/material/table';
import { ProfileComponent } from './components/profile/profile.component';


@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    DialogboxComponent,
    CartComponent,
    PaymentsComponent,
    OrdersComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatButtonModule,
    NgImageSliderModule,
    MatDialogModule,
    IvyCarouselModule,
    MatTableModule
  ]
})
export class UserModule { }
