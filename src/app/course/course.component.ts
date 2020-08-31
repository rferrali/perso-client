import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Course, Person } from '../model'; 
import { FormArray, FormBuilder, Validators, FormGroup } from '@angular/forms'
import { StoreService } from '../store.service'; 
import { AuthenticationService } from '../authentication.service'; 

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  @Input() course = new Course; 
  @Input() mode: string;
  @Input() edittedId: number;
  private _new: boolean
  @Input() get new() {
    return this._new;
  }
  set new(value: any) {
    this._new = !(value === undefined);
  }
  @Output() delete = new EventEmitter<Course>();
  @Output() edit = new EventEmitter<number>();
  allPeople: Person[]; 

  editForm: FormGroup; 
  showDetails = false;
  sortableButtons: any;
  get btns() { 
    return this.editForm.get('btns') as FormGroup; 
   }
  
   sortablePeople: any; 
   otherPeople: Person[]; 

  get people() { 
    return this.editForm.get('people') as FormArray;
  }

  // initialization

  constructor(
    private store: StoreService, 
    private fb: FormBuilder
  ) { }

  ngOnInit() { 
    if (!this.course) this.course = new Course;
    this.createEditForm(); 
    this.sortableButtons = this.btns.get('buttons').value;
    this.sortablePeople = this.people.value;
    let people = this.course.people.map(x => x.id);
    this.store.people.subscribe(people => {this.allPeople = people}); 
    this.otherPeople = this.allPeople.filter(x => !people.includes(x.id) ); 
   }

  enableEdit(): void {
    this.edit.emit(this.course.id);
  }

  createEditForm(): void {
    this.editForm = this.fb.group({
        id: [this.course.id], 
        name: [this.course.name, Validators.required], 
        term: [this.course.term, Validators.required], 
        level: [this.course.level, Validators.required], 
        details: [this.course.details, Validators.required], 
        role: [this.course.role, Validators.required], 
        order: [this.course.order], 
        btns: this.fb.group({
          buttons: this.fb.array(this.course.buttons.map(button => this.fb.group(button))), 
          newButton: this.fb.group({
            icon: [''], 
            label: [''], 
            type: ['0'], 
            file: [''], 
            url: ['']
          })
        }), 
        people: this.fb.array(this.course.people.map(coauthor => this.fb.group(coauthor))), 
    })
  }

  onSubmit(): void {
    let form = this.editForm.value; 
    form.buttons = form.btns.buttons; 
    delete form.btns; 
    this.course = form as Course; 
    if(this.course.id) {
      this.store.updateCourse(this.course);
    } else {
      this.store.addCourse(this.course);
    }
    this.edit.emit(this.course.id);
  }

  onRestore(): void {
    let course = this.course as any; 
    this.editForm.reset(course);
    this.editForm.setControl(
      'btns', 
      this.fb.group({
        buttons: this.fb.array(this.course.buttons.map(button => this.fb.group(button))), 
        newButton: this.fb.group({
          icon: [''], 
          label: [''], 
          type: ['0'], 
          file: [''], 
          url: ['']
        })
      })
    ); 
    
    this.editForm.setControl(
      'people', 
      this.fb.array(
        this.course.people.map(x => this.fb.group(x))
        )
    );

    
    this.sortableButtons = this.btns.get('buttons').value; 
    this.sortablePeople = this.people.value; 
    let people = this.course.people.map(x => x.id);
    this.otherPeople = this.allPeople.filter(x => !people.includes(x.id) ); 
  }

  onCancel(): void {
    this.onRestore(); 
    this.edit.emit(this.course.id);
  }
  
  onDelete(course: Course): void {
    this.delete.emit(course);
  }

}
