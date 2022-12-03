import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { StoreCreateComponent } from './components/store-create/store-create.component';
import { UserStoresComponent } from './components/user-stores/user-stores.component';
import { AuthenticationService } from './services/authentication.service';

const routes: Routes = [
  { path: 'user-stores', component: UserStoresComponent, canActivate: [AuthenticationService] },
  { path: 'store-create', component: StoreCreateComponent, canActivate: [AuthenticationService] },
  { path: 'sign-up', component: SignUpComponent },
  { path: '**', component: SignInComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
