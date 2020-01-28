import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Dataset } from '../model'; 
import { FormBuilder, Validators, FormGroup } from '@angular/forms'
import { StoreService } from '../store.service'; 
import { AuthenticationService } from '../authentication.service'; 

@Component({
  selector: 'app-dataset',
  templateUrl: './dataset.component.html',
  styleUrls: ['./dataset.component.scss']
})
export class DatasetComponent implements OnInit {

  @Input() dataset: Dataset; 
  @Input() disableEdit: boolean; 
  @Input() editMode: boolean; 
  @Input() deleteMode: boolean;
  @Output() isEditMode = new EventEmitter<boolean>(); 
  @Output() deleteEvent = new EventEmitter<Dataset>(); 

  editForm: FormGroup; 
  showDetails = false;

  createEditForm(): void {
    this.editForm = this.fb.group({
        id: [this.dataset.id], 
        description: [this.dataset.description, Validators.required]
    })
  }

  enableEdit(): void {
    this.editMode = true; 
    this.isEditMode.emit(true); 
  }

  onSubmit(): void {
    let form = this.editForm.value; 
    this.dataset = form as Dataset; 
    if(this.dataset.id) {
      this.store.updateDataset(this.dataset);
    } else {
      this.store.addDataset(this.dataset);
    }
    this.isEditMode.emit(false);
  }

  onRestore(): void {
    let dataset = this.dataset as any; 
    this.editForm.reset(dataset);
  }

  onCancel(): void {
    this.onRestore(); 
    this.editMode = false; 
    this.isEditMode.emit(false); 
  }
  
  onDelete(dataset: Dataset): void {
    this.deleteEvent.emit(dataset); 
  }

  constructor(
    private store: StoreService, 
    private fb: FormBuilder, 
    private auth: AuthenticationService
  ) { }

  ngOnInit() {
    this.createEditForm(); 
  }

}
