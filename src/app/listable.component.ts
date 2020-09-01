import { Input, EventEmitter, Output } from '@angular/core';
import { Listable, Keyword } from './model'; 
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { StoreService } from './store.service';

export class ListableComponent {
    @Input() object: Listable; 
    @Input() mode: string; 
    @Input() edittedId: number;
    _new: boolean;
    @Input() get new() {
        return this._new;
    }
    set new(value: any) {
        this._new = !(value === undefined);
    }
    @Output() delete = new EventEmitter<Listable>();
    @Output() edit = new EventEmitter<number>();

    editForm: FormGroup; 
    showSummary = false;
    allKeywords: Keyword[]; 
    get editable(): boolean {
        return (this.mode == 'edit' && this.object.id == this.edittedId) || (this.mode == 'create' && this.new)
    } 
    get buttons() { 
        return this.editForm.get('buttons') as FormGroup; 
    }
    get people() { 
        return this.editForm.get('people') as FormArray;
    }
    get keywords() { 
        return this.editForm.get('keywordsGroup') as FormGroup;
    }

    constructor(
        public store: StoreService, 
        public fb: FormBuilder
    ) { }

    // ngOnInit() { 
    //     if (!this.paper) this.paper = new Paper;
    //     this.store.keywords.subscribe(keywords => { 
    //       this.allKeywords = keywords
    //         .sort(function(a, b){
    //           var x = a.keyword.toLowerCase();
    //           var y = b.keyword.toLowerCase();
    //           if (x < y) {return -1;}
    //           if (x > y) {return 1;}
    //           return 0;
    //         });
    //       this.createEditForm(); 
    //     }); 
    //    }

    buttonsGroup(): FormGroup {
        return this.fb.group({
            buttons: this.fb.array(this.object.buttons.map(button => this.fb.group(button))), 
            newButton: this.fb.group({
              icon: [''], 
              label: [''], 
              type: ['0'], 
              file: [''], 
              url: ['']
            })
          });
    }

    peopleArray(): FormArray {
        return this.fb.array(this.object.people.map(person => this.fb.group(person)));
    }

    keywordsGroup(): FormGroup {
        return this.fb.group({
            keywords: this.fb.array(
              this.allKeywords.map(keyword => {
                return this.fb.control(this.object.keywords.map(k => k.id).includes(keyword.id))
              })
            )
          });
    }

    enableEdit(): void {
      this.edit.emit(this.object.id);
    }

    onRestore(): void {
        this.editForm.reset(this.object);
        if(this.object.hasButtons) this.editForm.setControl('buttons', this.buttonsGroup()); 
        if(this.object.hasPeople) this.editForm.setControl('people', this.peopleArray()); 
        if(this.object.hasKeywords) this.editForm.setControl('keywordsGroup', this.keywordsGroup()); 
      }
    
      onCancel(): void {
        this.onRestore(); 
        this.edit.emit(this.object.id);
      }
      
      onDelete(): void {
        this.delete.emit(this.object); 
      }

}