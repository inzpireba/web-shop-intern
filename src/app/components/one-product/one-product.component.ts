import { Component, OnInit } from '@angular/core';

interface Review{
  review: String,
  stars: Number
}

@Component({
  selector: 'app-one-product',
  templateUrl: './one-product.component.html',
  styleUrls: ['./one-product.component.css']
})
export class OneProductComponent{

  constructor() { }

  reviewClicked: Boolean = false;
  reviewNumber: number = 0;
  reviews: Review[] = [];
  reviewText: String = "";
  reviewStarsSelected: number = 0;
  oneReview = <Review>{};

  stars:any = document.getElementsByClassName("rated");
  starChosen: Boolean = false;
  addingStars: any;
  loopuntil: any;

  addRating(passedRating: number){
    if(this.starChosen) {

    } else {
      this.reviewStarsSelected = passedRating;
    for(let i=0;i<passedRating;i++){
      this.stars[i].classList.toggle("checked");
    }
  }
    this.starChosen = true;
  }

  pushReview(){
    if(this.reviewText.length < 5 || this.reviewStarsSelected == 0) {
      alert("Problem. Short text or stars not chosen.");
    } else {
    this.oneReview = {
      review: this.reviewText,
      stars: this.reviewStarsSelected
    }
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
  
}
