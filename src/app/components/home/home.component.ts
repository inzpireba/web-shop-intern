import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';

interface Product {
  url: string;
  name: string;
  price: number;
  type: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private service: UserService) { }
  products: any;
  inputVal: string;
  name: any;
  key: any = "";
  p: number;
  noResult: boolean = false;

  ngOnInit(): void {
    
    this.produkti = [];
    this.produkti.push(this.pen);
    this.produkti.push(this.book);
    this.produkti.push(this.chair);
    this.produkti.push(this.jacket);
/*
    this.service.getProducts().subscribe(
      data=> {
        this.products = data as string[];
      }
    ); */
  }

  Search() {
    
    this.ngOnInit();  

    if(this.key != ""){
      this.filtered();
    }

    if(this.key == "all"){
      this.ngOnInit();
      this.noResult = false;
    }

    this.produkti = this.produkti.filter(
        res => {
          return res.name.toLocaleLowerCase().match(this.name.toLocaleLowerCase());
        }
      )

    if(this.name == "" && this.key != "") {
     this.filtered();
    }
    if(this.name == "" && this.key == "all") {
      this.ngOnInit();
     }
    this.checkResults();
  }

  checkResults(){
    if(this.produkti.length==0) {
      this.noResult = true
    } else {
      this.noResult = false;
    } 
  }

  filtered(){
    this.produkti = this.produkti.filter(
      res => {
        return res.type.toLocaleLowerCase().match(this.key);
      }
    )
    this.checkResults(); 
  }
  
  filteri: any;

  sort(val: string){
    
    this.filteri = document.getElementsByClassName("filter-p");
    for(let i=0;i<this.filteri.length;i++){
      this.filteri[i].classList.remove("bolded");
      if(this.filteri[i].dataset.filter==val) {
        this.filteri[i].classList.toggle("bolded");
      }
    }
    
    this.p = 1;
    this.key = val;
    this.name = "";
    this.ngOnInit();

    if(this.key=="all") {
      this.ngOnInit();   
      this.noResult = false;
    } else {
      this.filtered();
  }
}



  pen: Product = {
    url: "https://s3-us-west-2.amazonaws.com/melingoimages/Images/70572.jpg",
    name: "Pen",
    price: 1.43,
    type: "accessories"
  }
  book: Product = {
    url: "data:image/jpeg;base64,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",
    name: "Book",
    price: 2.1,
    type: "accessories"
  }
  chair: Product = {
    url: "https://thermaltake.azureedge.net/pub/media/catalog/product/cache/e4fc6e308b66431a310dcd4dc0838059/x/f/xfit_black-white01.jpg",
    name: "Chair",
    price: 11.43,
    type: "sale"
  }
  jacket: Product = {
    url: "data:image/jpeg;base64,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",
    name: "Jacket",
    price: 21.43,
    type: "men"
  }

  
produkti: Product[] = [];

}
