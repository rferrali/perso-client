import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Software } from '../model'; 
import { FormArray, FormBuilder, Validators, FormGroup } from '@angular/forms'
import { StoreService } from '../store.service'; 
import { AuthenticationService } from '../authentication.service'; 

@Component({
  selector: 'app-software',
  templateUrl: './software.component.html',
  styleUrls: ['./software.component.css']
})
export class SoftwareComponent implements OnInit {

  @Input() software: Software; 
  @Input() disableEdit: boolean; 
  @Input() editMode: boolean; 
  @Input() deleteMode: boolean;
  @Output() isEditMode = new EventEmitter<boolean>(); 
  @Output() deleteEvent = new EventEmitter<Software>(); 

  editForm: FormGroup; 
  showDetails = false;
  
  sortableButtons: any;
  get btns() { 
    return this.editForm.get('btns') as FormGroup; 
   }

  enableEdit(): void {
    this.editMode = true; 
    this.isEditMode.emit(true); 
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
    if(this.software.id) {
      this.store.updateSoftware(this.software);
    } else {
      this.store.addSoftware(this.software);
    }
    this.isEditMode.emit(false);
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

    // autosize.update($('.autosize'));
  }

  onCancel(): void {
    this.onRestore(); 
    this.editMode = false; 
    this.isEditMode.emit(false); 
  }
  
  onDelete(software: Software): void {
    this.deleteEvent.emit(software); 
  }

  

  // initialization

  constructor(
    private store: StoreService, 
    private fb: FormBuilder, 
    private auth: AuthenticationService
  ) { }

  ngOnInit() { 
    if(!this.software.buttons) this.software.buttons = []; 
    this.createEditForm(); 
    this.sortableButtons = this.btns.get('buttons').value;
    // $(document).ready(() => {
    //   autosize($('.autosize'));
    // });
   }


}
