import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { Auth2Guard } from './auth/auth2.guard';
import { ContactPageComponent } from './components/contact-page/contact-page.component';
import { ControlPanelComponent } from './components/control-panel/control-panel.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import {LoginComponent} from './components/login/login.component'
import { OneProductComponent } from './components/one-product/one-product.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
 
const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'register', component: SignUpComponent, canActivate:[Auth2Guard]},
  { path: 'login', component: LoginComponent, canActivate:[Auth2Guard]},
  { path: 'product/:id', component: OneProductComponent},
  { path: 'contact', component: ContactPageComponent},
  { path: 'cart', component: ShoppingCartComponent},
  { path: 'header', component: HeaderComponent},
  { path: 'control', component: ControlPanelComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
