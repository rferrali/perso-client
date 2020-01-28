import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl, SafeResourceUrl } from '@angular/platform-browser'; 
import { StoreService } from '../store.service'; 
import { Me, Social }  from '../model'; 
import { AuthenticationService } from '../authentication.service'; 
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms'; 
import { ValidateAllOrNothing } from '../validators'; 

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  me: Me; 
  editMode = false;
  addSocial = false;  
  sortMode = false;
  mapMode = false;
  sortableSocials: Social[];  
  form: FormGroup; 
  mapUrl: SafeResourceUrl; 

  get socials() { 
    return this.form.get('socials') as FormArray;
  }

  get newSocial() { 
    return this.form.get('newSocial') as FormGroup;
  }

  constructor(
    public auth: AuthenticationService, 
    private fb: FormBuilder, 
    private sanitizer: DomSanitizer, 
    private store: StoreService
  ) { }

  ngOnInit() {
    this.store.me.subscribe(x => {
      this.me = x; 
      this.makeForm(); 
      this.sanitize(x.map_url); 
    });  
  }

  sanitize(url: string) {
    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url); 
  }

  makeForm() {
    this.sortableSocials = this.me.socials; 
    let form = {
      address: [this.me.address, Validators.required], 
      map_url: [this.me.map_url, Validators.required], 
      newSocial: this.fb.group({
        name: [null], 
        icon: [null], 
        url: [null]
      }, { validators: ValidateAllOrNothing(['name', 'icon', 'url'])}),
      socials: null
    }; 
    if(!this.me.socials) {
      form.socials = this.fb.array([]); 
    } else {
      form.socials = this.fb.array(this.me.socials.map(social => this.fb.group(social))); 
    }
    this.form = this.fb.group(form);  
  }

  onDelete(i: number) {
    this.socials.removeAt(i); 
    this.sortableSocials.splice(i, 1); 
  }

  onSubmit() {
    let form = this.form.value; 
    this.me.socials = this.sortableSocials; 
    this.me.address = form.address; 
    this.me.map_url = form.map_url; 
    this.store.updateMe(this.me); 
    this.sanitize(this.me.map_url); 
    this.editMode = false; 
    this.onReset(); 
  }

  onReset() {
    this.form.reset(); 
    this.makeForm(); 
  }

  onCancel() {
    this.form.reset();
    this.makeForm();  
    this.editMode = false;  
    this.addSocial = false; 
    this.sortMode = false; 
  }

  onCancelSocial() {
    this.newSocial.reset(); 
    this.addSocial = false; 
  }

  onAddSocial() {
    this.socials.push(this.fb.group(this.newSocial.value)); 
    this.sortableSocials.push(this.newSocial.value); 
    this.onCancelSocial(); 
  }

  onSort() {
    this.sortMode = !this.sortMode; 
    if(this.sortMode) {
      this.sortableSocials = this.socials.value; 
    } else {
      this.form.setControl('socials', 
        this.fb.array(this.sortableSocials.map(social => this.fb.group(social)))
      ); 
    }
  }

}
