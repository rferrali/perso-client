import { Component, OnInit, Input } from '@angular/core';
import { Course } from '../model'; 
import { FormBuilder, Validators } from '@angular/forms'
import { StoreService } from '../store.service'; 
import { ListableComponent } from '../listable.component'; 

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent extends ListableComponent implements OnInit {

  @Input() object: Course; 

  // initialization

  constructor(
    public store: StoreService, 
    public fb: FormBuilder
  ) { super(store, fb) }

  ngOnInit() { 
    if (!this.object) this.object = new Course;
    this.createEditForm(); 
   }

  createEditForm(): void {
    this.editForm = this.fb.group({
        id: [this.object.id], 
        name: [this.object.name, Validators.required], 
        term: [this.object.term, Validators.required], 
        level: [this.object.level, Validators.required], 
        details: [this.object.details, Validators.required], 
        role: [this.object.role, Validators.required], 
        order: [this.object.order], 
        buttons: this.buttonsGroup(), 
        people: this.peopleArray() 
    })
  }

  onSubmit(): void {
    let form = this.editForm.value; 
    form.buttons = form.btns.buttons; 
    delete form.btns; 
    this.object = form as Course; 
    if(this.object.id) {
      this.store.updateCourse(this.object);
    } else {
      this.store.addCourse(this.object);
    }
    this.edit.emit(this.object.id);
  }

}
