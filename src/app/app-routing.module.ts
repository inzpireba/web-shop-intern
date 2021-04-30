import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactPageComponent } from './components/contact-page/contact-page.component';
import { HomeComponent } from './components/home/home.component';
import {LoginComponent} from './components/login/login.component'
import { OneProductComponent } from './components/one-product/one-product.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'register', component: SignUpComponent},
  { path: 'login', component: LoginComponent},
  {path: 'product', component:OneProductComponent},
  {path: 'contact', component:ContactPageComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
