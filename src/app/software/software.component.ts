import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Software } from '../model';
import { FormArray, FormBuilder, Validators, FormGroup } from '@angular/forms'
import { StoreService } from '../store.service';
import { ListableComponent } from '../listable.component';

@Component({
  selector: 'app-software',
  templateUrl: './software.component.html',
  styleUrls: ['./software.component.css']
})
export class SoftwareComponent extends ListableComponent implements OnInit {

  @Input() object: Software; 

  constructor(
    public store: StoreService,
    public fb: FormBuilder
  ) { super(store, fb) }

  ngOnInit() {
    if (!this.object) this.object = new Software;
    this.createEditForm();
  }

  createEditForm(): void {
    this.editForm = this.fb.group({
      id: [this.object.id],
      name: [this.object.name, Validators.required],
      slug: [this.object.slug, Validators.required],
      details: [this.object.details, Validators.required],
      order: [this.object.order],
      buttons: this.buttonsGroup()
    })
  }

  onSubmit(): void {
    let form = this.editForm.value;
    form.buttons = form.buttons.buttons;
    delete form.btns;
    this.object = form as Software;
    if (this.object.id) {
      this.store.updateSoftware(this.object);
    } else {
      this.store.addSoftware(this.object);
    }
    this.edit.emit(this.object.id);
  }

}
