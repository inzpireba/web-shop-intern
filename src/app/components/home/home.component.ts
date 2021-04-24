import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private service: UserService) { }
  products: any;
  ngOnInit(): void {
    this.service.getProducts().subscribe(
      data=> {
        this.products = data as string[];
      }
    );
  }

}
