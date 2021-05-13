import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminControlPanelComponent } from './components/admin-control-panel/admin-control-panel.component';
import { ContactPageComponent } from './components/contact-page/contact-page.component';
import { HomeComponent } from './components/home/home.component';
import {LoginComponent} from './components/login/login.component'
import { OneProductComponent } from './components/one-product/one-product.component';
import { ProductPanelComponent } from './components/product-panel/product-panel.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { UserAccountsComponent } from './components/user-accounts/user-accounts.component';
import { WebsiteInboxComponent } from './components/website-inbox/website-inbox.component';
const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'register', component: SignUpComponent},
  { path: 'login', component: LoginComponent},
  {path: 'product', component:OneProductComponent},
  {path: 'contact', component:ContactPageComponent},
  {path: 'cart',component:ShoppingCartComponent},
  {path: 'admin', component:AdminControlPanelComponent},
  {path:'users', component:UserAccountsComponent},
  {path: 'products', component:ProductPanelComponent},
  {path:'email', component:WebsiteInboxComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
