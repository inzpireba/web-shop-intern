import { Injectable } from '@angular/core';
import {User} from '../models/user.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {Product} from '../models/products.model';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private toastr:ToastrService, private router: Router) { 
   
  }
  readonly URL = 'http://localhost:50467/api/User';
  readonly LoginURL = 'http://localhost:50467/api/User/Login';
  readonly UserProfileURL = 'http://localhost:50467/api/UserProfile';
  readonly productURL = 'http://localhost:50467/api/Products';
  readonly reviewURL = 'http://localhost:50467/api/Reviews';
  user: User;
  review: any;
  addUser(user: User){
    this.http.post(this.URL, user).subscribe(
      res => {
        this.toastr.success("Registration successful.");
        setTimeout(() => {
          this.router.navigateByUrl('login')
        }, 2000);
      },
      err => {
        console.log(err);
        this.toastr.error("Something went wrong!")
      }
    )
  }

  loginUser(user: User){
    this.http.post(this.LoginURL, user).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        this.toastr.success("Login successful.");
        setTimeout(() => {
          this.router.navigateByUrl('')
        }, 2000);
      },
      err => {
        if(err.status == 400){
          this.toastr.error('Incorrect username or password');
        }else{
          console.log(err);
        }
      }
    )
  }
  getProducts(){
    return this.http.get(this.productURL);
  }
  single: any;
  test: any;
  getProductById(id: number){
    return this.http.get(`${this.productURL}/${id}`).subscribe(
      data=> {
        this.single = data;
        this.router.navigateByUrl('product');
      }
    );
  }
  productId: number;
  populateProduct(){
    var object = localStorage.getItem('productID');
    object = JSON.parse(object);
    this.test = object;
    this.productId = this.test.productId;
    console.log(this.productId);
    this.getProductById(this.productId);
    this.http.get(`${this.productURL}/${this.productId}`).subscribe(
      data=> {
        this.single = data;
        this.router.navigateByUrl('product');
      }
    );
  }

  initProduct(){
    this.populateProduct();
    console.log("test" + this.single);
    return this.single;
    
  }

  getUserProfile(){
    return this.http.get(this.UserProfileURL);
  }
  addReview(review: any){
    this.http.post(this.reviewURL, review).subscribe(
      res => {
        this.toastr.success("added new review");
      },
      err => {console.log(err);}
    );
  }
  getReviews(){
    return this.http.get(this.reviewURL);
  }
}
