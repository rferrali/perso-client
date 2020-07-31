import { Component, OnInit, Input, HostListener, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BackendService } from '../backend.service'; 

@Component({
  selector: '[app-icon-picker]',
  templateUrl: './icon-picker.component.html',
  styleUrls: ['./icon-picker.component.scss']
})
export class IconPickerComponent implements OnInit {

  icons = [] as string[];
  form: FormGroup;
  @Input() icon: string;
  isOpen = false;
  @Output() select = new EventEmitter<string>();

  constructor(
    private fb: FormBuilder, 
    private backend: BackendService
  ) { }

  @HostListener('click')
  onClick() {
    this.isOpen = true;
 }

  ngOnInit() {
    this.backend.getIcons().subscribe(icons => {
      this.icons = icons; 
    })
    this.form = this.fb.group({
      icon: [this.icon, Validators.required]
    })
    
  }

  onSubmit() {
    this.isOpen = false;
    this.select.emit(this.form.get('icon').value);
  }

  pick(icon: string) {
    this.form.get('icon').setValue(icon);
  }

  open() {
    this.isOpen = true; 
  }

  get displayIcon() {
    const current = this.form.get('icon').value; 
    return current != '' ? current : 'fas fa-icons text-muted'
  }

}
