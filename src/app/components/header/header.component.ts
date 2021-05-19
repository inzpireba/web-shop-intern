import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/user.service';

interface CartItem{
  name: String,
  price: number,
  quantity: number,
  img: String
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
  cartProducts: CartItem[];
  ngOnInit(): void {
   
    /*
      localStorage.removeItem('cartproducts');
  localStorage.removeItem('token');
  localStorage.removeItem('role');
    */

    if(localStorage.getItem('token') != null){
      this.service.getUserProfile().subscribe(
        res => {
          this.userDetails = res;
          if(this.userDetails.role == "admin"){
            localStorage.setItem('role', 'admin');
          }
        },
        err => {
          console.log(err);
        }
      );
    }
    if(localStorage.getItem('cartproducts')!= null){
      this.cartProducts = JSON.parse(localStorage.getItem("cartproducts") || "[]");
    }
  

  }

  removeFromCart(product: any){
     this.cartProducts = this.cartProducts.filter(i=> i.name != product.name);
     localStorage.setItem("cartproducts", JSON.stringify(this.cartProducts));

  }
  
logout(){
  localStorage.removeItem('cartproducts');
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  this.toastr.success('Logged out!');
  this.router.navigateByUrl('login');
}

}
