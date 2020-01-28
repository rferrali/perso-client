import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Me }  from '../model'; 
import { AuthenticationService } from '../authentication.service'; 
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; 
import { StoreService } from '../store.service'; 

@Component({
  selector: 'app-front',
  templateUrl: './front.component.html',
  styleUrls: ['./creative.css'], 
  encapsulation: ViewEncapsulation.None
})
export class FrontComponent implements OnInit {

  me: Me; 
  editMode = false; 
  form: FormGroup; 

  constructor(
    public auth: AuthenticationService, 
    private fb: FormBuilder, 
    private store: StoreService
  ) { }

  ngOnInit() {
    this.store.me.subscribe(x => {
      this.me = x; 
      this.form = this.fb.group({
        about: [this.me.about, Validators.required], 
        cv: [this.me.cv, Validators.required]
      }); 
    });  
  }

  onSubmit() {
    let form = this.form.value; 
    this.me.about = form.about; 
    this.me.cv = form.cv; 
    this.store.updateMe(this.me); 
    this.editMode = false; 
  }

  onCancel() {
    this.form.reset({
      about: this.me.about, 
      cv: this.me.cv
    }); 
    this.editMode = false; 
    
  }

}
