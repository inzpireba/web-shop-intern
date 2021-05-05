import { Component, OnInit } from '@angular/core';
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
  // npm install emailjs-com
  public sendEmail(e: Event) {
    e.preventDefault();
    emailjs.sendForm('service_ryj7eqq', 'template_9gtqai6', e.target as HTMLFormElement, 'user_gCiOA3ejIvKtil3O0bGRt')
      .then((result: EmailJSResponseStatus) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
  }

}
