import { Component } from '@angular/core';
import { Paper } from '../model'; 
import { FormBuilder, Validators } from '@angular/forms'
import { StoreService } from '../store.service'; 
import { ListableComponent } from '../listable.component';

@Component({
  selector: 'app-paper',
  templateUrl: './paper.component.html',
  styleUrls: ['./paper.component.css']
})
export class PaperComponent extends ListableComponent<Paper> {

  c = Paper;

  constructor(
    public store: StoreService, 
    public fb: FormBuilder
  ) { super(store, fb) }

  createEditForm(): void {
    this.editForm = this.fb.group({
        id: [this.object.id], 
        title: [this.object.title, Validators.required], 
        citation: [this.object.citation], 
        abstract: [this.object.abstract], 
        status: [this.object.status], 
        year: [this.object.year, Validators.pattern('^[0-9]*$')], 
        order: [this.object.order], 
        type: [this.object.type], 
        buttons: this.buttonsGroup(), 
        people: this.peopleArray(), 
        keywordsGroup: this.keywordsGroup()
    })
  }
   
}
