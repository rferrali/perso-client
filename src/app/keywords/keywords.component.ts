import { Component, OnInit } from '@angular/core';
import { StoreService } from '../store.service'; 
import { Keyword } from '../model'; 
import { ListablesComponent } from '../listables.component'; 

@Component({
  selector: 'app-keywords',
  templateUrl: './keywords.component.html',
  styleUrls: ['./keywords.component.css']
})
export class KeywordsComponent extends ListablesComponent<Keyword> implements OnInit {

  c = Keyword;

  constructor(
    public store: StoreService
  ) { super(store) }

  ngOnInit() {
    this.store.keywords.subscribe(x => {this.objects[0].objects = x}); 
  }

}
