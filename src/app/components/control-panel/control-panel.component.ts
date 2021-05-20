import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';

interface Product {
  name: string;
  price: number;
  category: string;
  description: string;
  quantity: number;
  dateAdded: Date;
  productId: number;
  imgUrl: string;
  imgUrl2: string;
  imgUrl3: string;
}
interface AddedProduct {
  name: string;
  price: number;
  category: string;
  description: string;
  quantity: number;
  dateAdded: Date;
  imgUrl: string;
  imgUrl2: string;
  imgUrl3: string;
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
    this.service.getUsers().subscribe(
      res=>{
        this.users = res;
      },
      err=>{console.log(err);
      }
    );
    this.service.getProducts().subscribe(
      res=>{
        this.products = res;
      },
      err=>{console.log(err);
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
  imgUrl2: any;
  imgUrl3: any;
  setProduct(){
    var today = new Date();
    this.nameTemp = document.getElementById('productName');
    this.descTemp = document.getElementById('prod-description');
    this.quantityTemp = document.getElementById('productQuantity');
    this.priceTemp = document.getElementById('productPrice');
    this.categoryTemp = document.getElementById('productCategory');
    this.body = {
      productId: this.editedproduct.productId, 
      name: this.nameTemp.value, 
      description: this.descTemp.value, 
      quantity: this.quantityTemp.value, 
      price: this.priceTemp.value, 
      dateAdded: today, 
      category: this.categoryTemp.value,
      imgUrl: this.editedproduct.imgUrl,
      imgUrl2: this.editedproduct.imgUrl2,
      imgUrl3: this.editedproduct.imgUrl3
    };
  }

  saveProduct(){
    this.setProduct();
    this.pageID = 2;
    this.modalOpened = false;
    this.service.editProduct(this.editedproduct.productId, this.body);
  }

  openAddModal(){
    this.addModal = true;
  }
  addedProduct: AddedProduct;
  saveAddedProduct() {
    var today = new Date();
    this.nameTemp = document.getElementById('productName');
    this.descTemp = document.getElementById('prod-description');
    this.quantityTemp = document.getElementById('productQuantity');
    this.priceTemp = document.getElementById('productPrice');
    this.categoryTemp = document.getElementById('productCategory');
    this.imgUrl = document.getElementById('imgUrl-input');
    this.imgUrl2 = document.getElementById('imgUrl2-input');
    this.imgUrl3 = document.getElementById('imgUrl3-input');
    this.addedProduct = {
      name: this.nameTemp.value, 
      description: this.descTemp.value, 
      quantity: this.quantityTemp.value, 
      price: this.priceTemp.value, 
      dateAdded: today, 
      category: this.categoryTemp.value,
      imgUrl: this.imgUrl.value,
      imgUrl2: this.imgUrl2.value,
      imgUrl3: this.imgUrl3.value
    };
    this.service.addProduct(this.addedProduct);
  }
  productDeletion: any;
  deleteId: number;
  deleteProduct(product: any){
    this.productDeletion = product.name;
    this.deleteModal = true;
    this.deleteId = product.productId;
  }
  delete(){
    this.service.deleteProduct(this.deleteId);
    this.deleteModal = false;
  }
  userDeletion: any;
  deleteUserId: number;
  deleteUser(user: any){
    this.userDeletion = user.firstname + " " + user.lastname;
    this.deleteUserModal = true;
    this.deleteUserId = user.userId;
  }
  deleteUserDB(){
    this.service.deleteUser(this.deleteUserId);
    this.deleteUserModal = false;
  }

}
