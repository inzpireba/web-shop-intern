import { Component, OnInit } from '@angular/core';

interface CartItem{
  imeProizvoda: String,
  cijenaProizvoda: number,
  kvantitetProizvoda: number,
  slikaUrl: String
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
      console.log(this.cartProducts)
      for(let i=0; i<this.cartProducts.length; i++){
        this.totalQty += this.cartProducts[i].kvantitetProizvoda;
        this.totalPrice += this.cartProducts[i].cijenaProizvoda*this.cartProducts[i].kvantitetProizvoda;
      }
    }
  }

}
