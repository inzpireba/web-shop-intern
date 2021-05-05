import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';

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

  constructor(private service: UserService) { }
  single: any;
  ngOnInit() : void{
    this.single = this.service.populateProduct();
    console.log(this.single);
  }
  reviewClicked: Boolean = false;
  reviewNumber: number = 0;
  reviews: Review[] = [];
  reviewText: String = "";
  reviewStarsSelected: Number = 0;
  oneReview = <Review>{};

  addRating(passedRating: Number){
    this.reviewStarsSelected = passedRating;
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
  /*  alert("Review successfully added.");  */
    this.reviewNumber = this.reviewNumber + 1;
    this.reviewText = "";
    this.reviewStarsSelected = 0;
  }
}

}
