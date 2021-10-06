import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../../models/user.model';
import { UserService } from 'src/app/shared/user.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  constructor(private service: UserService, private router: Router, private toastr:ToastrService) {
  }
  hide : boolean = true;
  user!: User;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  http: any; 
  addedUser = new User();
  onSubmit(data:any){
    this.addedUser.firstname = data.firstName;
    this.addedUser.lastname = data.lastName;
    this.addedUser.email = data.email;
    this.addedUser.password = data.password;  
    const options = {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(this.addedUser)
    }
    fetch('http://localhost:5000/register',options)
        

        this.toastr.success("Registration successful.");
        setTimeout(() => {
          this.router.navigateByUrl('login') 
        }, 2000);

        
  
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
      lastname: '',
      role: ''
    }
  }

}
