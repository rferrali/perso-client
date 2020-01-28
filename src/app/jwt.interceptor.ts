import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from './authentication.service';
import { User } from './model';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    
    currentUser: User; 

    constructor(private authenticationService: AuthenticationService) { 
        this.authenticationService.currentUser.subscribe(
            usr => {this.currentUser = usr}
        )
     }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        if (this.currentUser && this.currentUser.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.currentUser.token}`
                }
            });
        }

        return next.handle(request);
    }
}
