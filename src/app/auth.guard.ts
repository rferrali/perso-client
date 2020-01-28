import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from './authentication.service';
import { User } from './model'; 

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    currentUser: User; 

    constructor(
        private router: Router,
        private auth: AuthenticationService
    ) { 
        this.auth.currentUser.
        subscribe(usr => {this.currentUser = usr}); 
     }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.currentUser) {
            // logged in so return true
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
}
