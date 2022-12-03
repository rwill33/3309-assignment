import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Service {
  public loggedIn: boolean = false;
  public username: string = '';
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

  public getUserStores(): Observable<any> {
    return this.http.get<any>(this.url + '/stores/' + this.username);
  }

  public getAllProducts(): Observable<any> {
    return this.http.get<any>(this.url + '/products');
  }
}
