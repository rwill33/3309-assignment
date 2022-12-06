import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Service {
  public loggedIn: boolean = false;
  public username: string = '';
  public stores: any[] = [];
  public cart: any[] = [];
  public products: any[] = [];
  public savedAddresses: any[] = [];
  public customerOrders: any[] = [];
  private url: string = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  public putUser(user: any): Observable<any> {
    return this.http.put<any>(this.url + '/users', user);
  }

  public getUsers(): Observable<any> {
    return this.http.get<any>(this.url + '/users');
  }

  public putStore(store: any): Observable<any> {
    return this.http.put<any>(this.url + '/store', store);
  }
  public putStoreInfo(storeId: any, description: any, streetAddress1: any, streetAddress2: any, postalCode: any,country: any, province: any, city: any): Observable<any> {
    return this.http.post<any>(this.url + '/store/'+ storeId, {description: description, streetAddress1: streetAddress1, streetAddress2: streetAddress2, postalCode: postalCode, country: country, province: province, city: city});
  }

  public getUserStores(): Observable<any> {
    return this.http.get<any>(this.url + '/stores/' + this.username);
  }

  public getStoreById(id: any): Observable<any> {
    return this.http.get<any>(this.url + '/store/' + id);
  }

  public getStoreProducts(id: any): Observable<any> {
    return this.http.get<any>(this.url + '/products/' + id);
  }

  public getAllProducts(): Observable<any> {
    return this.http.get<any>(this.url + '/products');
  }
  public findBestSeller(storeId: number) : Observable<any>{
    return this.http.get<any>(this.url + '/bestSeller/' + storeId)
  }
  public findStoreId(storeName:string): Observable<any>{
    return this.http.get<any>(this.url + '/findStoreId/' + storeName)
  }
  public getAnnualStore(id:number): Observable<any>{
    return this.http.get<any>(this.url + '/findStoreAnnual/' + id)
  }
  public findStoreNames(storeName:string): Observable<any>{
    return this.http.get<any>(this.url + '/findStoreNames/' + storeName)
  }

  public addProductToStore(product: any){
    return this.http.put<any>(this.url + '/store/' + product.storeId, product);
  }


  // public async addRatingToProducts() {
  //   for (let i = 0; i < this.products.length; i++) {
  //     const reviews = await this.getProductReview(this.products[i].productID).toPromise();
  //     let averageRating = 0;
  //     if (reviews.length > 0) {
  //       for (let j = 0; j < reviews.length; j++) {
  //         averageRating += reviews[j].rating;
  //       }
  //       averageRating = averageRating / reviews.length;
  //     }
  //     this.products[i]['rating'] = averageRating;
  //   }
  // }

  public getProductReview(productId: any): Observable<any> {
    return this.http.get<any>(this.url + '/productReview/' + productId);
  }

  public getCartItems(): Observable<any> {
    return this.http.get<any>(this.url + '/cart/' + this.username);
  }

  public addCartItem(cartItem: any): Observable<any> {
    return this.http.put<any>(this.url + '/cart/' + this.username, cartItem);
  }

  public deleteCartItem(productId: number): Observable<any> {
    return this.http.delete<any>(this.url + '/cart/' + this.username + '?productId=' + productId,);
  }

  public buyCart(): Observable<any> {
    return this.http.put<any>(this.url + '/order', { username: this.username });
  }

  public getCustomerAddresses(): Observable<any> {
    return this.http.get<any>(this.url + '/customerAddress/' + this.username);
  }

  public addCustomerAddresses(address: any): Observable<any> {
    return this.http.put<any>(this.url + '/customerAddress', address);
  }

  public getCustomerOrders() {
    return this.http.get<any>(this.url + '/order?username=' + this.username);
  }

  public getStoreOrders(storeId: number) {
    return this.http.get<any>(this.url + '/order/' + storeId);
  }

  public getAllStores(){
    return this.http.get<any>(this.url + '/findAllStores');
  }


}
