import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { StoreService } from '../store.service'; 
import { BackendService } from '../backend.service'; 
import { ValidatePassword } from '../validators'; 
import { Me } from '../model';  

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss']
})
export class OnboardingComponent implements OnInit {

  form: FormGroup; 
  y = new Date(); 
  onboarded = true; 
  me: Me; 

  constructor(
    private fb: FormBuilder, 
    private store: StoreService, 
    private backend: BackendService
  ) { }

  ngOnInit() {
    this.backend.getMe().subscribe(
      x => this.me = x, 
      () => {}, 
      () => {
        if(!this.me.last_name) {
          this.onboarded = false; 
          this.form = this.fb.group({
            email: ['', [Validators.email, Validators.required] ], 
            password1: ['', Validators.required ], 
            password2: ['', Validators.required ], 
            hint: ['', Validators.required], 
            first_name: [ 'Paul', Validators.required ], 
            last_name: [ 'Erdos', Validators.required ], 
            position: [ 'Unemployed genius', Validators.required ], 
            about: [ 'You know what geniuses do.', Validators.required ], 
            address: [ '<strong>My place</strong><br/>Princeton, NJ 08540', Validators.required ], 
            map_url: [ 'http://osm.org', Validators.required ]
          }, {
            validator: ValidatePassword('password1', 'password2')
          });
        }
      }
    )
  }

  onSubmit() {
    let f = this.form.value; 
    f.password = f.password1; 
    delete f.password1;  
    delete f.password2;  
    this.store.register(f); 
    this.onboarded = true; 
  }

}
