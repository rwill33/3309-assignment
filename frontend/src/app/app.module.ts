import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';

import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';

import { MenubarModule } from 'primeng/menubar';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogModule } from 'primeng/dialog';
import { ChipModule } from 'primeng/chip';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectButtonModule } from 'primeng/selectbutton';
import { RatingModule } from 'primeng/rating';
import { TableModule } from 'primeng/table';
import { InputSwitchModule } from 'primeng/inputswitch';
import { AccordionModule } from 'primeng/accordion';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { InputNumberModule } from 'primeng/inputnumber';

import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AppComponent } from './app.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { StoreCreateComponent } from './components/store-create/store-create.component';
import { AuthenticationService } from './services/authentication.service';
import { UserStoresComponent } from './components/user-stores/user-stores.component';
import { ViewStoresComponent } from './components/view-stores/view-stores.component';
import { SearchProductsComponent } from './components/search-products/search-products.component';
import { ViewProductsComponent } from './components/view-products/view-products.component';
import { BuyCartComponent } from './components/buy-cart/buy-cart.component';
import { OrdersComponent } from './components/orders/orders.component';
import { BestSellerComponent } from './components/best-seller/best-seller.component';
import { SearchStoresComponent } from './components/search-stores/search-stores.component';
//import{PopupModule} from 'ng2-opd-popup';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent,
    StoreCreateComponent,
    UserStoresComponent,
    ViewStoresComponent,
    SearchProductsComponent,
    ViewProductsComponent,
    BuyCartComponent,
    OrdersComponent,
    BestSellerComponent,
    SearchStoresComponent,
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MenubarModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    VirtualScrollerModule,
    MessagesModule,
    MessageModule,
    ProgressSpinnerModule,
    DialogModule,
    ChipModule,
    MultiSelectModule,
    SelectButtonModule,
    RatingModule,
    TableModule,
    InputSwitchModule,
    AccordionModule,
    InputTextareaModule,
    ConfirmDialogModule,
    DropdownModule,
    DataViewModule,
    TagModule,
    ToastModule,
    InputNumberModule,
    TabsModule.forRoot(),
    
    
  ],
  providers: [MessageService, ConfirmationService, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
