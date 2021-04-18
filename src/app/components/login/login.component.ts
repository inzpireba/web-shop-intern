import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/user.model';
import {HttpClient} from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide : boolean = true;
  constructor(private http: HttpClient, private toastr:ToastrService) {
  }
  emailAuthorized: boolean = false;
  pwAuthorized: boolean = false;
  loginUser = new User();
  parsedJson: any;  
  readonly URL = 'http://localhost:50467/api/User';
  onSubmit(data:any){
    let elem: HTMLElement = document.getElementById('invalidLogin');
    return this.http.get(this.URL).subscribe(
      res => {
        this.parsedJson = res;
        //console.log(this.parsedJson[3].email);
        for(let i of this.parsedJson){
          if(data.uname == i.email && data.psw == i.password){
            this.emailAuthorized = true;
            this.pwAuthorized = true;
          }          
        }
        if(this.emailAuthorized && this.pwAuthorized){
          this.toastr.success("Login successful.");
          elem.style.display = "none";
        }else{
          elem.style.display = "block";
        }
      },
      err => {
        console.log(err);
        this.toastr.error("Something went wrong!")
      }
    )
    
  }
  ngOnInit(): void {
  }

}