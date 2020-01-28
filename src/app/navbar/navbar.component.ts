import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../authentication.service'; 
import { User } from '../model';  

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isCollapsed = true;
  user: User; 

  constructor(
    private auth: AuthenticationService
  ) { }

  logout(event: any): void {
    event.preventDefault(); 
    this.auth.logout(); 
  }

  ngOnInit() {
    this.auth.currentUser.
    subscribe(usr => {this.user = usr}); 
  }

}
