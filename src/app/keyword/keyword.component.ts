import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { File, Keyword } from '../model'; 
import { StoreService } from '../store.service'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service'; 
import { ListableComponent } from '../listable.component'; 

@Component({
  selector: 'app-keyword',
  templateUrl: './keyword.component.html',
  styleUrls: ['./keyword.component.scss']
})
export class KeywordComponent extends ListableComponent<Keyword> {

  c = Keyword; 

  constructor(
    public store: StoreService, 
    public fb: FormBuilder
  ) { super(store, fb); }

  createEditForm(): void {
    this.editForm = this.fb.group({
      id: [this.object.id], 
      keyword: [this.object.keyword, Validators.required], 
      description: [this.object.description, Validators.required], 
      icon: [this.object.icon, Validators.required], 
      slug: [this.object.slug, Validators. required], 
      order: [this.object.order]
    })
  }

}
