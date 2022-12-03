import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { Service } from "./service.service";

@Injectable({ providedIn: 'root' })
export class AuthenticationService implements CanActivate {
    constructor(private service: Service) { }

    canActivate(): boolean {
        return (this.service.loggedIn == true);
    }
}