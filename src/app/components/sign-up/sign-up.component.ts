import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../../shared/user.model';
import {HttpClient} from '@angular/common/http';
import { UserService } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  hide : boolean = true;
  user!: User;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  constructor(private http: HttpClient,  private toastr:ToastrService, private router: Router) {
  }
  readonly URL = 'http://localhost:50467/api/User';
  addedUser = new User();
  onSubmit(data:any){
    this.addedUser.firstname = data.firstName;
    this.addedUser.lastname = data.lastName;
    this.addedUser.email = data.email;
    this.addedUser.password = data.password;
    this.http.post(this.URL, this.addedUser).subscribe(
      res => {
        this.toastr.success("Registration successful.");
        setTimeout(() => {
          this.router.navigateByUrl('/')
        }, 2000);
      },
      err => {
        console.log(err);
        this.toastr.error("Something went wrong!")
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
