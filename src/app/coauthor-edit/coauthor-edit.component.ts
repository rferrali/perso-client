import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Person } from '../model';
import { FormBuilder, Validators, FormGroup } from '@angular/forms'
import { StoreService } from '../store.service'

@Component({
  selector: 'app-coauthor-edit',
  templateUrl: './coauthor-edit.component.html',
  styleUrls: ['./coauthor-edit.component.css']
})
export class CoauthorEditComponent implements OnInit {

  @Input() person: Person; 
  @Output() submitted = new EventEmitter(); 
  editForm: FormGroup;

  createEditForm() {
    this.editForm = this.fb.group({
      id: this.person.id, 
      first_name: [this.person.first_name, Validators.required], 
      last_name: [this.person.last_name, Validators.required], 
      url: [this.person.url, Validators.required]
    }); 
  }

  onSubmit(): void {
    let form = this.editForm.value; 
    this.person = form as Person; 
    if(this.person.id) {
      this.store.updatePerson(this.person);
    } else {
      this.store.addPerson(this.person);
    }
    this.submitted.emit();
  }

  onCancel(): void {
    this.editForm.reset(); 
    this.submitted.emit();
  }

  constructor(
    private fb: FormBuilder, 
    private store: StoreService
  ) { }

  ngOnInit() {
    this.createEditForm(); 
  }

}
