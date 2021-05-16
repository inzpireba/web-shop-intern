import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
interface Product {
  imgUrl: string;
  name: string;
  price: number;
  category: string;
  description: string;
  size: string;
  quantity: number;
  dateAdded: Date;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private service: UserService, private router: Router, private toastr:ToastrService) { }
  products: any;
  inputVal: string;
  name: any;
  key: any = "";
  p: number;
  noResult: boolean = false;
  userDetails: any;
  cartClicked: boolean = false;
  cartProducts: any;
  mainPage: any;
  loader: any;
  ngOnInit(): void {
    this.mainPage = document.getElementById("main-page-container");
    this.loader = document.getElementById("loader");
    console.log(this.mainPage);
    this.produkti = [];
    this.service.getProducts().subscribe(
      data=> {
        this.products = data as Product[];
        this.produkti = [...this.products];
      }
    );

    setTimeout(() => {
      this.mainPage.setAttribute("style", "display: block;");
      this.loader.style.display = "none";
    }, 1500);
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
  localStorage.setItem('productID', JSON.stringify({
    productId: this.id
  }));
  this.router.navigateByUrl('product');
}

checkDate(date: Date){
  var productDate = new Date(date);
  var today = new Date();
  var difference = (today.getTime() - productDate.getTime());
  var toSeconds = difference/1000;
  var toDays = toSeconds/86400;
  toDays = Math.round(toDays);
  return (toDays < 7) ?  true : false; 
}
adminVerfiy(){
  if(localStorage.getItem('role') == "admin"){
    return true;
  }else{
    return false;
  }
}

produkti: Product[] = [];

}
