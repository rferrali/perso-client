import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Paper, Person, Keyword } from '../model'; 
import { FormArray, FormBuilder, Validators, FormGroup } from '@angular/forms'
import { StoreService } from '../store.service'; 
import { AuthenticationService } from '../authentication.service'; 
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-paper',
  templateUrl: './paper.component.html',
  styleUrls: ['./paper.component.css']
})
export class PaperComponent implements OnInit {

  @Input() paper: Paper; 
  @Input() disableEdit: boolean; 
  @Input() editMode: boolean; 
  @Input() deleteMode: boolean;
  @Input() kFilter: Keyword; 
  @Output() isEditMode = new EventEmitter<boolean>(); 
  @Output() deleteEvent = new EventEmitter<Paper>(); 
  people: Person[]; 

  editForm: FormGroup; 
  showAbstract = false;
  sortableButtons: any;
  sortableCoauthors: any; 
  otherAuthors: Person[];
  allKeywords: Keyword[]; 
  
  get btns() { 
    return this.editForm.get('btns') as FormGroup; 
   }
  
  get coauthors() { 
    return this.editForm.get('coauthors') as FormArray;
  }

  get keywords() { 
    return this.editForm.get('keywords') as FormArray;
  }

  enableEdit(): void {
    this.editMode = true; 
    this.isEditMode.emit(true); 
  }


  createEditForm(): void {

    this.editForm = this.fb.group({
        id: [this.paper.id], 
        title: [this.paper.title, Validators.required], 
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
        keywords: this.fb.array(
          this.allKeywords.map(keyword => {
            return this.fb.control(this.paper.keywords.some(h => h.id == keyword.id))
          })
        )
    })
  }

  onSubmit(): void {

    let form = this.editForm.value; 
    form.buttons = form.btns.buttons; 
    delete form.btns; 
    let test = form.keywords; 
    form.keywords = []; 
    for(let i in test) {
      if(test[i]) {
        form.keywords.push(this.allKeywords[i]); 
      }
    }
    this.paper = form as Paper; 
    if(this.paper.id) {
      this.store.updatePaper(this.paper);
    } else {
      this.store.addPaper(this.paper);
    }
    this.isEditMode.emit(false);
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
      'keywords',
       this.fb.array(
        this.allKeywords.map(keyword => {
          return this.fb.control(this.paper.keywords.some(h => h.id == keyword.id))
        })
       )
    )
    
    this.sortableButtons = this.btns.get('buttons').value; 
    this.sortableCoauthors = this.coauthors.value; 
    let coauthors = this.paper.coauthors.map(x => x.id);
    this.otherAuthors = this.people.filter(x => !coauthors.includes(x.id) ); 

    // autosize.update($('.autosize'));
  }

  onCancel(): void {
    this.onRestore(); 
    this.editMode = false; 
    this.isEditMode.emit(false); 
  }
  
  onDelete(paper: Paper): void {
    this.deleteEvent.emit(paper); 
  }

  

  // initialization

  constructor(
    private store: StoreService, 
    private fb: FormBuilder, 
    private auth: AuthenticationService, 
    private route: ActivatedRoute
  ) { }

  ngOnInit() { 
    if(!this.paper.buttons) this.paper.buttons = []; 
    if(!this.paper.coauthors) this.paper.coauthors = []; 
    if(!this.paper.keywords) this.paper.keywords = [];
    this.paper.keywords.sort(function(a, b){
      var x = a.keyword.toLowerCase();
      var y = b.keyword.toLowerCase();
      if (x < y) {return -1;}
      if (x > y) {return 1;}
      return 0;
    });
    this.store.keywords.subscribe(keywords => { 
      this.allKeywords = keywords; 
      this.createEditForm(); 
    }); 
    
    this.sortableButtons = this.btns.get('buttons').value;
    this.sortableCoauthors = this.coauthors.value;
    let coauthors = this.paper.coauthors.map(x => x.id);
    this.store.people.subscribe(people => {this.people = people}); 
    this.otherAuthors = this.people.filter(x => !coauthors.includes(x.id) ); 
    // $(document).ready(() => {
    //   autosize($('.autosize'));
    // });
   }

   
}
