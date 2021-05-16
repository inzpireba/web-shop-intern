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
  productId: number;
  initProduct(){
    var object = localStorage.getItem('productID');
    object = JSON.parse(object);
    this.test = object;
    this.productId = this.test.productId;
    return this.http.get(`${this.productURL}/${this.productId}`);
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

  getUsers(){
    return this.http.get(this.URL);
  }
  editUser(id: number, body: any){
    this.http.put(`${this.URL}/${id}`, body);
  }
  editProduct(id: number, body: any){
    this.http.put(`${this.productURL}/${id}`, body).subscribe(
      res=>{ 
        this.toastr.success(`Successfully edited ${body.name}`);
        
      },
      err=>{console.log(err)}
    );
  }
  addProduct(product: any){
    this.http.post(this.productURL, product).subscribe(
      res=>{
        console.log(res);
      },
      err=>{
        console.log(err);
      }
    )
  }
  deleteProduct(id: number){
    this.http.delete(`${this.productURL}/${id}`).subscribe(
      res=>{
        this.toastr.success("Product successfully deleted.");
      },
      err=>{
        console.log(err);
      }
    );
  }
  deleteUser(id: number){
    this.http.delete(`${this.URL}/${id}`).subscribe(
      res=>{
        this.toastr.success("User successfully deleted.");
      },
      err=>{
        console.log(err);
      }
    );
  }
    
}
