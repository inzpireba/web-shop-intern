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

  
  getUsers(){
    return this.http.get('http://localhost:5000/getUsers');
  } 
      
  getProducts(){
    return this.http.get('http://localhost:5000/getProducts');
  }
  single: any;
  test: any;
  productId: number;
  initProduct(id: any){
   /* var object = localStorage.getItem('productID');
    object = JSON.parse(object);
    this.test = object; 
    this.productId = this.test.productId; */
    return this.http.get(`http://localhost:5000/getProducts/${id}`);
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
    return this.http.get('http://localhost:5000/getReviews');
  }

  editUser(id: number, body: any){
    this.http.put(`${this.URL}/${id}`, body);
  }
  editProduct(id: number, body: any){ 
    this.http.put(`http://localhost:5000/editProduct/${id}`, body).subscribe(
      res=>{ 
        this.toastr.success(`Successfully edited ${body.name}`);
        
      },
      err=>{console.log(err)}
    );
    setTimeout(()=>{
      location.reload();
    },1000)
    this.toastr.success("Product successfully edited.");
  }
  addProduct(product: any){ 
    this.http.post('http://localhost:5000/addProduct', product).subscribe(
      res=>{
        console.log(res);
      },
      err=>{
        console.log(err);
      }
    )
    setTimeout(()=>{
      location.reload();
    },1000)
    this.toastr.success("Product successfully added.");
  }
  deleteProduct(id: number){
    this.http.delete(`http://localhost:5000/deleteProduct/${id}`).subscribe(
      res=>{
        this.toastr.success("Product successfully deleted.");
      },
      err=>{
        console.log(err);
      }
    );
    setTimeout(()=>{
      location.reload();
    },1000)
    this.toastr.success("Product successfully deleted.");
  }
  deleteUser(id: number){ 
    this.http.delete(`http://localhost:5000/deleteUser/${id}`).subscribe(
      res=>{
        this.toastr.success("User successfully deleted.");
      },
      err=>{
        console.log(err);
      }
    );
    setTimeout(()=>{
      location.reload();
    },1000)
    this.toastr.success("User successfully deleted.");
  }

}
