import { Component, OnInit, Input } from '@angular/core';
import { Me } from '../model'; 
import { AuthenticationService } from '../authentication.service'; 
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; 
import { StoreService } from '../store.service'; 

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  me: Me; 
  editMode = false; 
  form: FormGroup; 

  constructor(
    private auth: AuthenticationService, 
    private fb: FormBuilder, 
    private store: StoreService
  ) { }

  ngOnInit() {
    this.store.me.subscribe(x => {
      this.me = x; 
      this.form = this.fb.group({
        first_name: [this.me.first_name, Validators.required], 
        last_name: [this.me.last_name, Validators.required], 
        position: [this.me.position, Validators.required]
      }); 
    }); 
    
  }

  onSubmit() {
    let form = this.form.value; 
    this.me.first_name = form.first_name; 
    this.me.last_name = form.last_name; 
    this.me.position = form.position; 
    this.store.updateMe(this.me); 
    this.editMode = false; 
  }

  onCancel() {
    this.form.reset({
      first_name: this.me.first_name, 
      last_name: this.me.last_name, 
      position: this.me.position, 
    }); 
    this.editMode = false; 
    
  }

}
