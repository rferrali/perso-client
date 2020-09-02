import { Component } from '@angular/core';
import { Dataset } from '../model'; 
import { FormBuilder, Validators } from '@angular/forms'
import { StoreService } from '../store.service'; 
import { ListableComponent } from '../listable.component'; 

@Component({
  selector: 'app-dataset',
  templateUrl: './dataset.component.html',
  styleUrls: ['./dataset.component.scss']
})
export class DatasetComponent extends ListableComponent<Dataset> {

  c = Dataset; 

  createEditForm(): void {
    this.editForm = this.fb.group({
        id: [this.object.id], 
        description: [this.object.description, Validators.required]
    })
  }
  constructor(
    public store: StoreService, 
    public fb: FormBuilder
  ) { super(store, fb) }

}
