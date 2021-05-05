import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';

interface Product {
  imgUrl: string;
  name: string;
  price: number;
  category: string;
  description: string;
  size: string;
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
    
    this.service.getProducts().subscribe(
      data=> {
        this.products = data as Product[];
        this.produkti = [...this.products];
      }
    );
    //this.products.forEach(val=> this.produkti.push(Object.assign({}, val)));
  }

  Search() {
    this.produkti = [...this.products];
    if(this.key != ""){
      this.filtered();

    }

    if(this.key == "all"){
      this.produkti = [...this.products];
      this.noResult = false;
    }
  
    this.produkti = this.produkti.filter(
        res => {
          console.log(res);
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
    this.produkti = [...this.products];
    this.produkti = this.produkti.filter(
      res => {
        return res.category.toLocaleLowerCase().match(this.key); 
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
    if(this.key=="all") {
      this.produkti = [...this.products];
      this.noResult = false;
    } else {
      this.filtered();
      console.log(this.produkti);
  }
  return this.produkti;
}
id : number;
openProduct(product:any){
  this.id = product.productId;
  this.service.getProductById(this.id)
}


pen: Product = {
  imgUrl: "https://s3-us-west-2.amazonaws.com/melingoimages/Images/70572.jpg",
  name: "Pen",
  price: 1.43,
  category: "accessories",
  description: "kk",
  size: "L"
}
  
produkti: Product[] = [];

}
