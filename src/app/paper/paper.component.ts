import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Paper, Person, Keyword } from '../model'; 
import { FormArray, FormBuilder, Validators, FormGroup } from '@angular/forms'
import { StoreService } from '../store.service'; 

@Component({
  selector: 'app-paper',
  templateUrl: './paper.component.html',
  styleUrls: ['./paper.component.css']
})
export class PaperComponent implements OnInit {

  @Input() paper: Paper; 
  @Input() mode: string; 
  @Input() edittedId: number;
  private _new: boolean;
  @Input() get new() {
    return this._new;
  }
  set new(value: any) {
    this._new = !(value === undefined);
  }
  @Output() delete = new EventEmitter<Paper>();
  @Output() edit = new EventEmitter<number>();
  people: Person[]; 

  editForm: FormGroup; 
  showAbstract = false;
  allKeywords: Keyword[]; 
  get editable(): boolean {
    return (this.mode == 'edit' && this.paper.id == this.edittedId) || (this.mode == 'create' && this.new)
  } 
  get btns() { 
    return this.editForm.get('btns') as FormGroup; 
   }
  get coauthors() { 
    return this.editForm.get('coauthors') as FormArray;
  }
  get keywords() { 
    return this.editForm.get('keywordsGroup') as FormGroup;
  }

  constructor(
    private store: StoreService, 
    private fb: FormBuilder
  ) { }

  ngOnInit() { 
    if (!this.paper) this.paper = new Paper;
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

  enableEdit(): void {
    this.edit.emit(this.paper.id);
  }

  createEditForm(): void {

    this.editForm = this.fb.group({
        id: [this.paper.id], 
        title: [this.paper.title, Validators.required], 
        citation: [this.paper.citation], 
        abstract: [this.paper.abstract], 
        status: [this.paper.status], 
        year: [this.paper.year, Validators.pattern('^[0-9]*$')], 
        order: [this.paper.order], 
        type: [this.paper.type], 
        btns: this.fb.group({
          buttons: this.fb.array(this.paper.buttons.map(button => this.fb.group(button))), 
          newButton: this.fb.group({
            icon: [''], 
            label: [''], 
            type: ['0'], 
            file: [''], 
            url: ['']
          })
        }), 
        coauthors: this.fb.array(this.paper.coauthors.map(coauthor => this.fb.group(coauthor))), 
        keywordsGroup: this.fb.group({
          keywords: this.fb.array(
            this.allKeywords.map(keyword => {
              return this.fb.control(this.paper.keywords.map(k => k.id).includes(keyword.id))
            })
          )
        })
    })
  }

  onSubmit(): void {
    let form = this.editForm.value; 
    form.buttons = form.btns.buttons; 
    delete form.btns; 
    const test = form.keywordsGroup.keywords; 
    delete form.keywordsGroup; 
    form.keywords = this.allKeywords.filter((value, index) => test[index]);
    form.keywords = []; 
    for(let i in test) {
      if(test[i]) {
        form.keywords.push(this.allKeywords[i]); 
      }
    }
    this.paper = new Paper(form); 
    if(this.paper.id) {
      this.store.updatePaper(this.paper);
    } else {
      this.store.addPaper(this.paper);
    }
    this.edit.emit(this.paper.id);
  }

  onRestore(): void {
    let paper = this.paper as any; 
    this.editForm.reset(paper);
    this.editForm.setControl(
      'btns', 
      this.fb.group({
        buttons: this.fb.array(this.paper.buttons.map(button => this.fb.group(button))), 
        newButton: this.fb.group({
          icon: [''], 
          label: [''], 
          type: ['0'], 
          file: [''], 
          url: ['']
        })
      })
    ); 
    this.editForm.setControl(
      'coauthors', 
      this.fb.array(
        this.paper.coauthors.map(x => this.fb.group(x))
        )
    );
    this.editForm.setControl(
      'keywordsGroup',
      this.fb.group({
        keywords: this.fb.array(
          this.allKeywords.map(keyword => {
            return this.fb.control(this.paper.keywords.map(k => k.id).includes(keyword.id))
          })
        )
      })
    )
  }

  onCancel(): void {
    this.onRestore(); 
    this.edit.emit(this.paper.id);
  }
  
  onDelete(paper: Paper): void {
    this.delete.emit(paper); 
  }

   
}
