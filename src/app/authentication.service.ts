import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs'; 
import { BackendService } from './backend.service'; 
import { MessageService } from './message.service';
import { Message, User, Me } from './model'; 
import { Router } from '@angular/router';  

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private _currentUser: BehaviorSubject<User> = new BehaviorSubject<User>(new User);    
  public readonly currentUser: Observable<User> = this._currentUser.asObservable();
  public preview = true; 


  constructor(
    private backend: BackendService, 
    private messageService: MessageService, 
    private router: Router
  ) {
    let obj = JSON.parse(localStorage.getItem('currentUser'));
    this._currentUser.next(obj); 
    if(obj) {
      this.preview = false; 
    }
  }

  private log(message: string, type?: string) {
    if(!type) type = 'info'; 
    this.messageService.add({message: message, type: type} as Message);
  }

  togglePreview() {
    this.preview = !this.preview; 
  }

  login(email: string, password: string) {
    this.backend.login(email, password).
    subscribe(
      res => {
        localStorage.setItem('currentUser', JSON.stringify(res)); 
        this._currentUser.next(res); 
        this.router.navigate(['/']); 
        this.preview = false; 
      }, 
      err => {
        this.log(err.error, 'danger'); 
      }
    ); 
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this._currentUser.next(null);
    this.router.navigate(['/']);  
  }

  
  
}
