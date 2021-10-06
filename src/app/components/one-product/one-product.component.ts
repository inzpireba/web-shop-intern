import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { ActivatedRoute } from '@angular/router';

interface Review{
  proizvodID: number,
  korisnikID: number,
  sadrzajRecenzije: String,
  ocjena: number 
}
interface CartItem{
  imeProizvoda: String,
  cijenaProizvoda: number,
  kvantitetProizvoda: number,
  slikaUrl: String
}

@Component({
  selector: 'app-one-product',
  templateUrl: './one-product.component.html',
  styleUrls: ['./one-product.component.css']
})
export class OneProductComponent{

  constructor(private service: UserService, private _Activatedroute:ActivatedRoute) { }
  productQuantity: number;
  averageRating: number = 0;
  single: any;
  userDetails: any;
  reviewClicked: Boolean = false;
  reviewNumber: number = 0;
  reviews: any = [];
  reviewText: String = "";
  databaseReviews: any;
  reviewStarsSelected: number = 0;
  oneReview = <Review>{};
  cartItems: CartItem[] = [];
  cartItem: CartItem;
  id: any;
  isLogged: any;
  ngOnInit() : void{
    this.service.getUsers().subscribe((response) => {
      console.log('Response from API is ', response)
      this.tempUsers = response; 
    }, (error) => {
      console.log('Error is ' + error)
    }) 
    this.isLogged = localStorage.getItem('ime');
    this._Activatedroute.paramMap.subscribe(params => { 
      this.id = params.get('id'); 
  });

    this.service.initProduct(this.id).subscribe(
      data=> {
         this.single = data; 
         this.single = this.single.singleProduct[0];
         console.log(this.single)
      }
    );
  }

  stars:any = document.getElementsByClassName("rated");
  starChosen: Boolean = false;
  addingStars: any;
  loopuntil: any;
  imeReview: any;
  tempUsers: any = [];

  checkWho(id){  
    this.imeReview = this.tempUsers.podaci.filter( x => x.korisnikID == id); 
    this.imeReview = this.imeReview[0].ime; 
  }

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
        this.databaseReviews = this.databaseReviews.reviews; 
        this.reviews = [...this.databaseReviews]; 
        this.reviews = this.reviews.filter(
          res => res.proizvodID == this.single.proizvodID
        ); 
        this.reviewNumber = this.reviews.length;
        for(let i=0; i<this.reviewNumber; i++){
          this.averageRating+= this.reviews[i].ocjena;
        }
        this.averageRating = Math.round(this.averageRating/this.reviewNumber);
      },
      err => {console.log(err)}
    );
  }

  passUserID: any;

  pushReview(){
    this.passUserID = this.tempUsers.podaci.filter( x => x.ime == this.isLogged)
    this.passUserID = this.passUserID[0].korisnikID
    console.log(this.passUserID)
    if(this.reviewText.length < 5 || this.reviewStarsSelected == 0) {
      alert("Problem. Short text or stars not chosen.");
    } else {
    this.oneReview = {
      proizvodID: +this.single.proizvodID,
      korisnikID: +this.passUserID,
      sadrzajRecenzije: this.reviewText,
      ocjena: +this.reviewStarsSelected
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
  const options = {
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify(this.oneReview)
  }
  fetch('http://localhost:5000/addReview',options)
}
exists: boolean = false;
temp: any;
qty: number = 0;
pushToCart(product: any){
  this.cartItems = JSON.parse(localStorage.getItem("cartproducts") || "[]");
  this.temp = document.getElementById("productQty");
  this.productQuantity = parseInt(this.temp.value);
  this.qty = product.cijenaProizvoda*this.productQuantity;
  console.log(this.cartItems);
  this.cartItem = {
    slikaUrl: product.slikaUrl,
    imeProizvoda: product.imeProizvoda,
    cijenaProizvoda: product.cijenaProizvoda,
    kvantitetProizvoda: this.productQuantity
  }
  for(let i=0; i<this.cartItems.length; i++){
    if(this.cartItems[i].imeProizvoda == this.cartItem.imeProizvoda){
      this.cartItems[i].kvantitetProizvoda+= this.cartItem.kvantitetProizvoda;
      this.exists = true;
    }
  }
  if(!this.exists){
    this.cartItems.push(this.cartItem);
  }
  localStorage.setItem("cartproducts", JSON.stringify(this.cartItems));
  location.reload();
} 

imgId: number = 1;
chosenImg: any;
changeImg(img:string, id:number){
  this.chosenImg = document.getElementById('main-image');
  this.chosenImg.src = `${img}`;
  this.imgId = id;
}


}
