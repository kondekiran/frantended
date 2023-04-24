import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServicesService {

  private countSubject = new BehaviorSubject<number>(0);
  public count$ = this.countSubject.asObservable();
  userData:any;

  updateCount(count: number) {
    this.countSubject.next(count);
  }
  constructor(
    private http:HttpClient,
    private router:Router,
    private toastr:ToastrService
  ) { }
 

  url = "https://localhost:7103";


   //Validating the user
   validateUser(data:any){
    return this.http.post(this.url + "/api/Users/ValidateUser",data);
  }

  //Register users data
  registerdata(data:any){
    return this.http.post(this.url+ "/api/Users/Register",data);
  }

  //Get User data by id
  getUserDatabyId(data:any){
    return this.http.get(this.url + "/api/Users/GetuserbyUserId" + data);
  }

  //List of Products
  allProductsList(){
    return this.http.get(this.url + "/api/Products/GetProducts");
  }

  //List of products based on categoryId
  productsListbyCategoryId(i:any){
    return this.http.get(this.url + "/api/Products/GetProductsByCategoryId"+i);
  }

  //Add Products to Carts Table
  addProductsToCarts(data:any){
    return this.http.post(this.url + "/api/Carts/AddProductsToCart",data);
  }

  //Get cart items by userId sp
  getCartItemsbyuserId(num:any){
    return this.http.get(this.url + "/api/Carts/GetProductsFromCartbyUser" + num);
  }

  //get product by productid
  getProductbyProductID(num:any){
    return this.http.get(this.url + "/api/Products/GetProductById"+num);
  }
 
  //Delete products in cart table
  DeletecartItem(num:any){
    return this.http.delete(this.url + "/api/Carts/DeleteProductbyCartId" + num);
  }
  //Bulk delete products based on UserId
  DeleteAllProductsInCarts(num:any){
    return this.http.delete(this.url + "/api/Carts/BulkDeletebyUser"+num);
  }
  

  //Add bulk products to orders table
  AddProductstoOrders(data:any){
    return this.http.post(this.url + "/api/Orders/bulkAdd",data);
  }

  //Get user ordered products list
  GetUserOrderedProducts(num:any){
    return this.http.get(this.url + "/api/Orders/ordersbyUser" + num);
  }

  //Get total orders List
  GetTotalOrdersList(){
    return this.http.get(this.url + "/api/Users/GetTotalOrders");
  }
  
  //Update the user order Status
  UpdateOrderStatus(data:any){
    return this.http.put(this.url + "/api/Orders/UpdateOrderStatus",data);
  }

  //Get All categories list
  GetCategoryList(){
    return this.http.get(this.url + "/api/Categories/GetCategories");
  }

  //Add products ---Admin
  AddProducts(data:any){
    return this.http.post(this.url + "/api/Products/AddProducts",data);
  }

  isLoggedIn(){

    var sessionData = sessionStorage.getItem('token');
    if(sessionData !==null){
      return true;
    }else{
      return false;
    }
  }

  //Checking user details valid or not
login(data:any){
   this.validateUser(data).subscribe((res) => { 
    sessionStorage.setItem('token', JSON.stringify(res));
    this.userData = res;
    console.log(this.userData);
    if(this.userData.type == 'admin'){
      this.router.navigate(['admin']);
    }else{
      this.router.navigate(['/user']);
    }
    
  },(err)=>{
    this.toastr.error("Invalid Username & Password");
  })
  }

  //For logout user
  logout(){
    sessionStorage.clear()
    this.router.navigate(['login']);
  }

}
