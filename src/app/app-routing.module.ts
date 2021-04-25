import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './components/login/login.component'
import { OneProductComponent } from './components/one-product/one-product.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import {ContactPageComponent} from './components/contact-page/contact-page.component';
const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'register', component: SignUpComponent},
  {path: 'product', component:OneProductComponent},
  {path: 'contact', component:ContactPageComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 