import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';

interface Review{
  comment: String,
  rating: number,
  user: String,
  productId: number
}
interface CartItem{
  name: String,
  price: number,
  quantity: number,
  img: String
}

@Component({
  selector: 'app-one-product',
  templateUrl: './one-product.component.html',
  styleUrls: ['./one-product.component.css']
})
export class OneProductComponent{

  constructor(private service: UserService) { }
  productQuantity: number = 2;
  averageRating: number = 0;
  single: any;
  userDetails: any;
  reviewClicked: Boolean = false;
  reviewNumber: number = 0;
  reviews: Review[] = [];
  reviewText: String = "";
  databaseReviews: any;
  reviewStarsSelected: number = 0;
  oneReview = <Review>{};
  cartItems: CartItem[] = [];
  cartItem: CartItem;
  ngOnInit() : void{
    this.service.initProduct().subscribe(
      data=> {
         this.single = data;
      }
    );
    

    if(localStorage.getItem('token') != null){
      this.service.getUserProfile().subscribe(
        res => {
          this.userDetails = res;
        },
        err => {
          console.log(err);
        }
      );
    }
  }


  stars:any = document.getElementsByClassName("rated");
  starChosen: Boolean = false;
  addingStars: any;
  loopuntil: any;

  addRating(passedRating: number){
    this.reviewStarsSelected = passedRating;
    for(let i=0; i<5; i++){
      this.stars[i].classList.remove("checked");
    }
    for(let i=0;i<passedRating;i++){
      this.stars[i].classList.toggle("checked");
  }
  }

  populateReviews(){
    this.reviewClicked = !this.reviewClicked;
    this.service.getReviews().subscribe(
      res => {
        this.databaseReviews = res;
        this.reviews = [...this.databaseReviews];
        this.reviews = this.reviews.filter(
          res => {
            return res.productId == this.single.productId;
          }
        );
        this.reviewNumber = this.reviews.length;
        for(let i=0; i<this.reviewNumber; i++){
          this.averageRating+= this.reviews[i].rating;
        }
        this.averageRating = Math.round(this.averageRating/this.reviewNumber);
      },
      err => {console.log(err)}
    );
  }


  pushReview(){
    if(this.reviewText.length < 5 || this.reviewStarsSelected == 0) {
      alert("Problem. Short text or stars not chosen.");
    } else {
    this.oneReview = {
      comment: this.reviewText,
      rating: this.reviewStarsSelected,
      user: this.userDetails.firstname,
      productId: this.single.productId
    }
    this.service.addReview(this.oneReview);
    this.reviews.push(this.oneReview);
    this.reviewNumber = this.reviewNumber + 1;
    this.reviewText = "";

    setTimeout(() =>{
      this.addingStars = document.getElementsByClassName("newReviewStars");
      this.loopuntil = this.reviewStarsSelected+(this.reviewNumber-1)*5;
      for(let i=0+(this.reviewNumber-1)*5;i<this.loopuntil;i++){
        this.addingStars[i].classList.toggle("checked");
      }
      for(let i=0;i<5;i++){
        this.stars[i].classList.remove("checked");
      }
      this.starChosen= false;
      this.reviewStarsSelected = 0;
      this.addingStars = [];
    },100)
  }
}

pushToCart(product: any){
  this.cartItems = JSON.parse(localStorage.getItem("cartproducts") || "[]");
  this.cartItem = {
    img: product.imgUrl,
    name: product.name,
    price: product.price*this.productQuantity,
    quantity: this.productQuantity
  }
  this.cartItems.push(this.cartItem);
  localStorage.setItem("cartproducts", JSON.stringify(this.cartItems));
  window.location.reload();
} 
}
