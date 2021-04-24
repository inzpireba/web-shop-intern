import { Injectable } from '@angular/core';
import {User} from '../models/user.model';
import {HttpClient} from '@angular/common/http';
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
  readonly productURL = 'http://localhost:50467/api/Products';
  user: User;
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
}
