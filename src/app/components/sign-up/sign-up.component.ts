import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../../shared/user.model';
import {HttpClient} from '@angular/common/http'
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  user!: User;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  constructor(private http: HttpClient, public service:UserService) {
  }
  readonly URL = 'http://localhost:50467/api/User';
  addedUser = new User();
  newob = {};
  onSubmit(data:any){

    //this.newob = {email:"alem@ggmail.com",firstname:"agem",lastname:"hgodzic",password:"g123456"};
    //console.log(this.newob);
    this.addedUser.firstname = data.firstName;
    this.addedUser.lastname = data.lastName;
    this.addedUser.email = data.email;
    this.addedUser.password = data.password;
    console.log(this.addedUser);
    this.http.post(this.URL, this.addedUser).subscribe(
      res => {

      },
      err => {
        console.log(err);
      }
    )
    
  }
  ngOnInit(): void {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.user = {
      email: '',
      password: '',
      firstname: '',
      lastname: ''
    }
  }

}
