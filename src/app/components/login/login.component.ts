import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import {HttpClient} from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide : boolean = true;
  constructor(public service: UserService, public router: Router) {
  }
  
  emailAuthorized: boolean = false;
  pwAuthorized: boolean = false;
  loginUser = new User();
  parsedJson: any;  
  readonly URL = 'http://localhost:50467/api/User';
  onSubmit(data:any){
    this.loginUser.email = data.uname;
    this.loginUser.password = data.password;
    this.service.loginUser(this.loginUser);
  }
  ngOnInit(): void {
    if(localStorage.getItem('token') != null){
      this.router.navigateByUrl('');
    }
  }

}