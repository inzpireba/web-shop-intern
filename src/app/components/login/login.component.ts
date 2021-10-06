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
  constructor(public service: UserService, public router: Router,private toastr:ToastrService) {
  }
   
  loginUser = new User(); 
  loginBtn: any; 
  loginApproved: Boolean = false;
  podaci:any; 

  onSubmit(data:any){

    this.loginUser.email = data.uname;
    this.loginUser.password = data.password;
    this.loginBtn = document.getElementById("loginBtn");

    for(let i=0;i<this.podaci.podaci.length;i++) {

      if(this.loginUser.email == this.podaci.podaci[i].email && 
        this.loginUser.password == this.podaci.podaci[i].sifra) {

          this.loginApproved = true;

          if(this.podaci.podaci[i].rola == 'adminRola'){
              localStorage.setItem('rola', 'admin');
              localStorage.setItem('ime', this.podaci.podaci[i].ime);
          }

          if(this.podaci.podaci[i].rola == 'korisnikRola'){
            localStorage.setItem('rola', 'korisnik');
            localStorage.setItem('ime', this.podaci.podaci[i].ime);
          }

      }
    }

    if(this.loginBtn.classList.contains('disabled-button')){
      
    }else{
        if(this.loginApproved) {
        this.toastr.success("Login successful.");
        setTimeout(() => {
          this.router.navigateByUrl('')
        }, 2000); 
      }
      else {
          this.toastr.error('Incorrect username or password');
        }
    }

  }
  ngOnInit(): void { 
    this.getDataFromAPI(); 
  }
  getDataFromAPI(){
    this.service.getUsers()
    .subscribe((response) => {
      console.log('Response from API is ', response)
      this.podaci = response; 
    }, (error) => {
      console.log('Error is ' + error)
    })
  }

}