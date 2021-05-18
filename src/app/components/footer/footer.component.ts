import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  adminVerify(){
    if(localStorage.getItem('role') == "admin"){
      return true;
    }else{
      return false;
    }
  }

}
