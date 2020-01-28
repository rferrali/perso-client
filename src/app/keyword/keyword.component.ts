import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { File, Keyword } from '../model'; 
import { StoreService } from '../store.service'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service'; 

@Component({
  selector: 'app-keyword',
  templateUrl: './keyword.component.html',
  styleUrls: ['./keyword.component.scss']
})
export class KeywordComponent implements OnInit {

  @Input() keyword: Keyword; 
  @Input() disableEdit: boolean; 
  @Input() editMode: boolean; 
  @Input() deleteMode: boolean;
  @Output() isEditMode = new EventEmitter<boolean>(); 
  @Output() deleteEvent = new EventEmitter<Keyword>(); 
  files: File[]; 
  form: FormGroup; 

  constructor(
    private store: StoreService, 
    private fb: FormBuilder, 
    public auth: AuthenticationService
  ) { }

  ngOnInit() {
    this.store.files.subscribe(x => {
      this.files = x.filter(a => a.extension == 'svg'); 
    }); 
    this.createForm(); 
  }

  enableEdit(): void {
    this.editMode = true; 
    this.isEditMode.emit(true); 
  }

  createForm(): void {
    this.form = this.fb.group({
      id: [this.keyword.id], 
      keyword: [this.keyword.keyword, Validators.required], 
      description: [this.keyword.description, Validators.required], 
      icon: [this.keyword.icon, Validators.required], 
      slug: [this.keyword.slug, Validators. required], 
      order: [this.keyword.order]
    })
  }

  onSubmit(): void {
    let form = this.form.value; 
    this.keyword = form as Keyword; 
    if(this.keyword.id) {
      this.store.updateKeyword(this.keyword);
    } else { 
      this.store.addKeyword(this.keyword);
    }
    this.isEditMode.emit(false);
  }

  onRestore(): void {
    let keyword = this.keyword as any; 
    this.form.reset(keyword);
  }

  onCancel(): void {
    this.onRestore(); 
    this.editMode = false; 
    this.isEditMode.emit(false); 
  }
  
  onDelete(keyword: Keyword): void {
    this.deleteEvent.emit(keyword); 
  }

}
