import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';

interface Product {
  cijenaProizvoda: string; 
  bojaProizvoda: string; 
  kvantitetProizvoda: number; 
  brendProizvoda: string;
  kategorijaProizvoda: string;
  imeProizvoda: string;
  opisProizvoda: string;
  slikaUrl: string;
}
interface AddedProduct {
  cijenaProizvoda: string; 
  bojaProizvoda: string; 
  kvantitetProizvoda: number; 
  brendProizvoda: string;
  kategorijaProizvoda: string;
  imeProizvoda: string;
  opisProizvoda: string;
  slikaUrl: string;
}


@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent implements OnInit {

  constructor(private service: UserService) { }
  users: any;
  userDetails: any;
  modalOpened: boolean = false;
  addModal: boolean = false;
  deleteModal: boolean = false;
  deleteUserModal: boolean = false;
  products: any;
  p: number;
  pageID: number=0;
  ngOnInit(): void {
    this.userDetails = localStorage.getItem('ime');
    this.service.getUsers().subscribe(
      res=>{
        this.users = res; 
        this.users = this.users.podaci;
      },
      err=>{console.log(err);
      }
    );
    this.service.getProducts().subscribe(
      res=>{
        this.products = res;
        this.products = this.products.produkti;
      },
      err=>{console.log(err);
      }
    );
  }

  editedproduct: any;
  editProduct(product: any){
    this.modalOpened = true;
    this.editedproduct = product; 
  }
  nameTemp: any;
  descTemp: any;
  quantityTemp: any;
  priceTemp: any;
  categoryTemp: any;
  body: Product;
  imgUrl: any; 
  editProdID: any;
  setProduct(){  
    this.descTemp = document.getElementById('prod-description');
    this.quantityTemp = document.getElementById('productQuantity');
    this.priceTemp = document.getElementById('productPrice');
    this.categoryTemp = document.getElementById('productCategory');
    this.imgUrl = document.getElementById('imgUrl-input'); 
    this.nameTemp = document.getElementById('productName'); 
    this.editedproduct = {
      cijenaProizvoda: this.priceTemp.value,  
      kvantitetProizvoda: this.quantityTemp.value,  
      kategorijaProizvoda: this.categoryTemp.value,
      imeProizvoda: this.nameTemp.value, 
      opisProizvoda: this.descTemp.value
    };  
  }
  tempImg: any;
  saveProduct(id: any){
    this.editProdID = id; 
    this.setProduct();
    this.pageID = 2;
    this.modalOpened = false;
    this.tempImg = this.products.find( x => x.proizvodID == id)
    this.editedproduct.slikaUrl = this.tempImg.slikaUrl; 
    this.service.editProduct(this.editProdID, this.editedproduct);
  }

  openAddModal(){
    this.addModal = true;
  }

  addedProduct: AddedProduct;
  saveAddedProduct() { 
    this.descTemp = document.getElementById('prod-description');
    this.quantityTemp = document.getElementById('productQuantity');
    this.priceTemp = document.getElementById('productPrice');
    this.categoryTemp = document.getElementById('productCategory');
    this.imgUrl = document.getElementById('imgUrl-input'); 
    this.nameTemp = document.getElementById('productName'); 
    this.addedProduct = {
      cijenaProizvoda: this.priceTemp.value, 
      bojaProizvoda: 'n',
      kvantitetProizvoda: this.quantityTemp.value, 
      brendProizvoda: 'n',
      kategorijaProizvoda: this.categoryTemp.value,
      imeProizvoda: this.nameTemp.value, 
      opisProizvoda: this.descTemp.value, 
      slikaUrl: this.imgUrl.value   
    }; 
    this.service.addProduct(this.addedProduct);
  }

  productDeletion: any;
  deleteId: number;
  deleteProduct(product: any){
    this.productDeletion = product.imeProizvoda;
    this.deleteModal = true;
    this.deleteId = product.proizvodID;
  }
  delete(){
    this.service.deleteProduct(this.deleteId);
    this.deleteModal = false;
  }
  userDeletion: any;
  deleteUserId: number;
  deleteUser(user: any){
    this.userDeletion = user.ime + " " + user.prezime;
    this.deleteUserModal = true;
    this.deleteUserId = user.korisnikID;
  }
  deleteUserDB(){ 
    this.service.deleteUser(this.deleteUserId);
    this.deleteUserModal = false; 
  }

}
