import { Component, OnChanges, Input } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms'
import { Button } from '../model'; 
import { ValidateRequiredType } from '../validators';
import { StoreService } from '../store.service' 

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css']
})
export class ButtonsComponent implements OnChanges {

  @Input() btns: FormGroup; 
  @Input() mode: string; 
  sortableButtons: Button[]; 
  showButton = false; 
  get buttons() {
    return this.btns.get('buttons') as FormArray;
  }
  get newButton() { 
    return this.btns.get('newButton') as FormGroup;
  }
  get type() {
    return this.newButton.get('type').value; 
  }

  constructor(
    public store: StoreService, 
    private fb: FormBuilder
  ) { }

  ngOnChanges() { 
    this.sortableButtons = this.buttons.value; 
   }

  

  showAddButton() {
    this.btns.setControl(
      'newButton',  
      this.fb.group({
        icon: ['', Validators.required], 
        label: ['', Validators.required], 
        type: ['0', Validators.required], 
        file: [''], 
        url: [''], 
      }, { validators: ValidateRequiredType('type', ['url', 'file'])}));
    this.showButton = true;
  }

  addButton() {
    let nb = this.newButton.value; 
    if(parseInt(nb.type) == 0) {
      nb.content = nb.url; 
    } else {
      nb.content = nb.file; 
    }
    delete nb.url; 
    delete nb.file;
    nb = this.fb.group(nb);   
    this.buttons.push(nb);
    this.sortableButtons = this.buttons.value;
    this.btns.setControl(
      'newButton', 
      this.fb.group({
        icon: [''], 
        label: [''], 
        type: ['0'], 
        url: [''], 
        file: ['']
      })
    ); 
    this.showButton = false; 
  }

  deleteButton(index: number) {
    this.buttons.removeAt(index);
    this.sortableButtons = this.buttons.value;
  }

  sortButtons(event: any): void {
    this.buttons.setValue(this.sortableButtons);
  }

  onCancelButton() {
    this.btns.setControl(
      'newButton', 
      this.fb.group({
        icon: [''], 
        label: [''], 
        type: ['0'], 
        url: [''], 
        file: ['']
      })
    ); 
    this.showButton = false; 
  }

  onIconPick(e) {
    this.newButton.get('icon').setValue(e);
  }

}
