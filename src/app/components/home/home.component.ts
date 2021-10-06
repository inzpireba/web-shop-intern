import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
interface Product {
  cijenaProizvoda: number;
  kvantitetProizvoda: number;
  bojaProizvoda: string;
  brendProizvoda: string;
  kategorijaProizvoda: string;
  imeProizvoda: string;
  opisProizvoda: string;
  slikaUrl: string;
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
    this.produkti = [];
    this.service.getProducts().subscribe(
      data=> {
        this.products = data as Product[];
        this.produkti = [...this.products.produkti]; 
        console.log(this.produkti)
      }
    );

    setTimeout(() => {
      this.mainPage.setAttribute("style", "display: block;");
      this.loader.style.display = "none";
    }, 800);
  }

  Search() {
    this.produkti = [...this.products.produkti];
    if(this.key != ""){
      this.filtered();

    }

    if(this.key == "all"){
      this.produkti = [...this.products.produkti];
      this.noResult = false;
    }
  
    this.produkti = this.produkti.filter(
        res => {
          console.log(res);
          return res.imeProizvoda.toLocaleLowerCase().match(this.name.toLocaleLowerCase());
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
    this.produkti = [...this.products.produkti];
    this.produkti = this.produkti.filter(
      res => {
        return res.kategorijaProizvoda.toLocaleLowerCase().match(this.key); 
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
      this.produkti = [...this.products.produkti];
      this.noResult = false;
    } else {
      this.filtered();
      console.log(this.produkti);
  }
  return this.produkti;
}
id : number;
url: string;
openProduct(product:any){
  this.id = product.proizvodID; 
  localStorage.setItem('productID', JSON.stringify({
    productId: this.id
  })); 
  this.router.navigate(['/product', this.id]);
  //this.router.navigateByUrl('product');
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

produkti: Product[] = [];

}
