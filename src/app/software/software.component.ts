import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Software } from '../model';
import { FormArray, FormBuilder, Validators, FormGroup } from '@angular/forms'
import { StoreService } from '../store.service';

@Component({
  selector: 'app-software',
  templateUrl: './software.component.html',
  styleUrls: ['./software.component.css']
})
export class SoftwareComponent implements OnInit {

  @Input() software = new Software;
  @Input() mode: string;
  @Input() edittedId: number;
  private _new: boolean
  @Input() get new() {
    return this._new;
  }
  set new(value: any) {
    this._new = !(value === undefined);
  }
  @Output() delete = new EventEmitter<Software>();
  @Output() edit = new EventEmitter<number>();

  editForm: FormGroup;
  showDetails = false;
  sortableButtons: any;
  get btns() {
    return this.editForm.get('btns') as FormGroup;
  }

  constructor(
    private store: StoreService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    if (!this.software) this.software = new Software;
    console.log(this.software);
    this.createEditForm();
    this.sortableButtons = this.btns.get('buttons').value;
  }

  enableEdit(): void {
    this.edit.emit(this.software.id);
  }

  createEditForm(): void {
    this.editForm = this.fb.group({
      id: [this.software.id],
      name: [this.software.name, Validators.required],
      slug: [this.software.slug, Validators.required],
      details: [this.software.details, Validators.required],
      order: [this.software.order],
      btns: this.fb.group({
        buttons: this.fb.array(this.software.buttons.map(button => this.fb.group(button))),
        newButton: this.fb.group({
          icon: [''],
          label: [''],
          type: ['0'],
          file: [''],
          url: ['']
        })
      })
    })
  }

  onSubmit(): void {
    let form = this.editForm.value;
    form.buttons = form.btns.buttons;
    delete form.btns;
    this.software = form as Software;
    if (this.software.id) {
      this.store.updateSoftware(this.software);
    } else {
      this.store.addSoftware(this.software);
    }
    this.edit.emit(this.software.id);
  }

  onRestore(): void {
    let software = this.software as any;
    this.editForm.reset(software);
    this.editForm.setControl(
      'btns',
      this.fb.group({
        buttons: this.fb.array(this.software.buttons.map(button => this.fb.group(button))),
        newButton: this.fb.group({
          icon: [''],
          label: [''],
          type: ['0'],
          file: [''],
          url: ['']
        })
      })
    );

    this.sortableButtons = this.btns.get('buttons').value;
  }

  onCancel(): void {
    this.onRestore();
    this.edit.emit(this.software.id);
  }

  onDelete(): void {
    this.delete.emit(this.software);
  }

}
