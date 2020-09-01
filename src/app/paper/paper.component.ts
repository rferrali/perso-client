import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Paper, Person, Keyword } from '../model'; 
import { FormArray, FormBuilder, Validators, FormGroup } from '@angular/forms'
import { StoreService } from '../store.service'; 
import { ListableComponent } from '../listable.component';

@Component({
  selector: 'app-paper',
  templateUrl: './paper.component.html',
  styleUrls: ['./paper.component.css']
})
export class PaperComponent extends ListableComponent implements OnInit {

  @Input() object: Paper; 

  constructor(
    public store: StoreService, 
    public fb: FormBuilder
  ) { super(store, fb) }

  ngOnInit() { 
    if (!this.object) this.object = new Paper;
    this.store.keywords.subscribe(keywords => { 
      this.allKeywords = keywords
        .sort(function(a, b){
          var x = a.keyword.toLowerCase();
          var y = b.keyword.toLowerCase();
          if (x < y) {return -1;}
          if (x > y) {return 1;}
          return 0;
        });
      this.createEditForm(); 
    }); 
   }

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

  onSubmit(): void {
    let form = this.editForm.value; 
    form.buttons = form.buttons.buttons; 
    const test = form.keywordsGroup.keywords; 
    delete form.keywordsGroup; 
    form.keywords = this.allKeywords.filter((value, index) => test[index]);
    form.keywords = []; 
    for(let i in test) {
      if(test[i]) {
        form.keywords.push(this.allKeywords[i]); 
      }
    }
    this.object = new Paper(form); 
    if(this.object.id) {
      this.store.updatePaper(this.object);
    } else {
      this.store.addPaper(this.object);
    }
    this.edit.emit(this.object.id);
  }

   
}
