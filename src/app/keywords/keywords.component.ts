import { Component, OnInit } from '@angular/core';
import { StoreService } from '../store.service'; 
import { Keyword, } from '../model'; 
import { AuthenticationService } from '../authentication.service'; 

@Component({
  selector: 'app-keywords',
  templateUrl: './keywords.component.html',
  styleUrls: ['./keywords.component.css']
})
export class KeywordsComponent implements OnInit {

  keywords: Keyword[]
  createMode = false; 
  deleteMode = false; 
  sortMode = false; 
  editMode = false; 
  disableEdit = false; 
  newKeyword = new Keyword; 

  constructor(
    private store: StoreService, 
    public auth:AuthenticationService
  ) { }

  ngOnInit() {
    this.store.keywords.subscribe(x => {this.keywords = x}); 
  }

  onEdit(event: boolean): void {
    this.editMode = event; 
    this.disableEdit = event;
    if(!this.editMode) {
      this.createMode = false; 
    }
  }

  onCreate(): void {
    this.editMode = false; 
    this.deleteMode = false; 
    this.sortMode = false; 
    this.createMode = true; 
    this.disableEdit = true; 
  }

  onDelete(): void {
    this.deleteMode = !this.deleteMode; 
    this.editMode = false; 
    this.sortMode = false; 
    this.createMode = false; 
    this.disableEdit = !this.disableEdit; 
  }

  onDeleteEvent(event: any): void {
    this.store.deleteKeyword(event); 
  }

  onSort(): void {
    this.sortMode = ! this.sortMode; 
    if(!this.sortMode) {
      let len = this.keywords.length;
      var i; 
      for (i=0; i<len; i++) {
        this.keywords[i].order = i; 
      }
      this.store.updateKeywords(this.keywords);
    }
  }

  // onSubmit() {
  //   let keyword = this.form.value as Keyword; 
  //   this.store.addKeyword(keyword); 
  //   this.addMode = false; 
  //   this.form.reset(); 
  // }

}
