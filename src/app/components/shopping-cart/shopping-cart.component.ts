import { Component, OnInit } from '@angular/core';

interface CartItem{
  name: String,
  price: number,
  quantity: number,
  img: String
}

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  constructor() { }
  cartProducts: CartItem[];
  totalQty: number = 0;
  totalPrice: number = 0;
  ngOnInit(): void {
    if(localStorage.getItem('cartproducts')!= null){
      this.cartProducts = JSON.parse(localStorage.getItem("cartproducts") || "[]");
      for(let i=0; i<this.cartProducts.length; i++){
        this.totalQty += this.cartProducts[i].quantity;
        this.totalPrice += this.cartProducts[i].price;
      }
    }
  }

}
