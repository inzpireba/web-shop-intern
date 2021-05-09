import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css']
})
export class ContactPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  alreadySent2: Boolean = false;
  alreadySent: Boolean = false;
  validationCompleted: Boolean;
  emailCorrect: Boolean = true;
  nameCorrect: Boolean = true;
  messageCorrect: Boolean = true;
  inputName: any;
  inputEmail: any;
  inputMessage: any;


  close(){
    let successMessage = document.getElementsByClassName("success_container");
    successMessage[0].classList.toggle("closed");
  }

  // npm install emailjs-com
  public sendEmail(e: Event) {

    e.preventDefault();

    if(this.alreadySent) {
      this.alreadySent2 = true;
    } else {
    
    this.inputEmail = document.getElementById("email");
    this.inputName = document.getElementById("name");
    this.inputMessage = document.getElementById("message"); 
    this.validationCompleted = false;
    
    let emailPatt = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)$/;
    let noSpacesPatt = /^\s*$/;
    this.emailCorrect = emailPatt.test(this.inputEmail.value);
    this.nameCorrect = !(noSpacesPatt.test(this.inputName.value));
    this.messageCorrect = !(noSpacesPatt.test(this.inputMessage.value));

    if(this.emailCorrect && this.nameCorrect && this.messageCorrect) {
      this.validationCompleted = true;
      this.alreadySent = true;
      this.inputEmail.value = "";
      this.inputName.value = "";
      this.inputMessage.value = "";
    } 
      if(this.validationCompleted) {
     
      emailjs.sendForm('service_ryj7eqq', 'template_9gtqai6', e.target as HTMLFormElement, 'user_gCiOA3ejIvKtil3O0bGRt')
      .then((result: EmailJSResponseStatus) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });

    }
    }

    


  }
}
