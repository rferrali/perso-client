import { Component, OnInit } from '@angular/core';
import { Software } from '../model'; 
import { StoreService } from '../store.service'; 
import { ListablesComponent } from '../listables.component'; 

@Component({
  selector: 'app-softwares',
  templateUrl: './softwares.component.html',
  styleUrls: ['./softwares.component.css']
})
export class SoftwaresComponent extends ListablesComponent<Software> implements OnInit {

  c = Software;

  constructor(
    public store: StoreService
  ) { super(store) }

  ngOnInit() {
    this.store.softwares.subscribe(softwares => {this.objects = softwares}); 
  }

}
