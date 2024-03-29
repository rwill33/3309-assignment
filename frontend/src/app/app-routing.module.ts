import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuyCartComponent } from './components/buy-cart/buy-cart.component';
import { OrdersComponent } from './components/orders/orders.component';
import { SearchProductsComponent } from './components/search-products/search-products.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { StoreCreateComponent } from './components/store-create/store-create.component';
import { UserStoresComponent } from './components/user-stores/user-stores.component';
import { AuthenticationService } from './services/authentication.service';
import { ViewStoresComponent } from './components/view-stores/view-stores.component';
import { SearchStoresComponent } from './components/search-stores/search-stores.component';
const routes: Routes = [
  {
    path: '', redirectTo: 'sign-in',  pathMatch: 'full'
  },
  { path: 'orders', component: OrdersComponent, canActivate: [AuthenticationService] },
  { path: 'buy', component: BuyCartComponent, canActivate: [AuthenticationService] },
  { path: 'products', component: SearchProductsComponent, canActivate: [AuthenticationService] },
  { path: 'user-stores', component: UserStoresComponent, canActivate: [AuthenticationService] },
  { path: 'store-create', component: StoreCreateComponent, canActivate: [AuthenticationService] },
  { path: 'sign-up', component: SignUpComponent },
  {path: 'view-store',component: ViewStoresComponent, canActivate: [AuthenticationService]},
  {path: 'search-stores',component: SearchStoresComponent, canActivate: [AuthenticationService]},
  { path: '**', component: SignInComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
