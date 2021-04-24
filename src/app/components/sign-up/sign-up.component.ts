import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../../models/user.model';
import { UserService } from 'src/app/shared/user.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  hide : boolean = true;
  user!: User;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  constructor(public service: UserService) {
  }
  addedUser = new User();
  onSubmit(data:any){
    this.addedUser.firstname = data.firstName;
    this.addedUser.lastname = data.lastName;
    this.addedUser.email = data.email;
    this.addedUser.password = data.password;
    this.service.addUser(this.addedUser);
    
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
