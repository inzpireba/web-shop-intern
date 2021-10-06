import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/user.service';

interface CartItem{
  imeProizvoda: String,
  cijenaProizvoda: number,
  kvantitetProizvoda: number,
  slikaUrl: String
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private service: UserService, private router: Router, private toastr:ToastrService) { }

  userDetails: any;
  cartClicked: boolean = false;
  cartProducts: CartItem[] = [];
  ngOnInit(): void { 
    if(localStorage.getItem('ime') != null){
          this.userDetails = localStorage.getItem('ime');
    }
    if(localStorage.getItem('cartproducts')!= null){
      this.cartProducts = JSON.parse(localStorage.getItem("cartproducts") || "[]");
    }
    console.log(this.cartProducts, 'ovdje')
  }

  removeFromCart(product: any){
     this.cartProducts = this.cartProducts.filter(i=> i.imeProizvoda != product.imeProizvoda);
     localStorage.setItem("cartproducts", JSON.stringify(this.cartProducts));
  }
  
logout(){
  localStorage.removeItem('cartproducts'); 
  localStorage.removeItem('rola');
  localStorage.removeItem('ime');
  this.toastr.success('Logged out!');
  this.router.navigateByUrl('login');
  this.userDetails = undefined;
}

}
