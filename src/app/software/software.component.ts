import { Component } from '@angular/core';
import { Software } from '../model';
import { FormBuilder, Validators } from '@angular/forms'
import { StoreService } from '../store.service';
import { ListableComponent } from '../listable.component';

@Component({
  selector: 'app-software',
  templateUrl: './software.component.html',
  styleUrls: ['./software.component.css']
})
export class SoftwareComponent extends ListableComponent<Software> {

  c = Software;

  constructor(
    public store: StoreService,
    public fb: FormBuilder
  ) { super(store, fb) }

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

}
