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

  @Input() course: Course; 
  @Input() disableEdit: boolean; 
  @Input() editMode: boolean; 
  @Input() deleteMode: boolean;
  @Output() isEditMode = new EventEmitter<boolean>(); 
  @Output() deleteEvent = new EventEmitter<Course>(); 
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

  enableEdit(): void {
    this.editMode = true; 
    this.isEditMode.emit(true); 
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
    this.isEditMode.emit(false);
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

    // autosize.update($('.autosize'));
  }

  onCancel(): void {
    this.onRestore(); 
    this.editMode = false; 
    this.isEditMode.emit(false); 
  }
  
  onDelete(course: Course): void {
    this.deleteEvent.emit(course); 
  }

  

  // initialization

  constructor(
    private store: StoreService, 
    private fb: FormBuilder, 
    private auth: AuthenticationService
  ) { }

  ngOnInit() { 
    if(!this.course.buttons) this.course.buttons = []; 
    if(!this.course.people) this.course.people = []; 
    this.createEditForm(); 
    this.sortableButtons = this.btns.get('buttons').value;
    this.sortablePeople = this.people.value;
    let people = this.course.people.map(x => x.id);
    this.store.people.subscribe(people => {this.allPeople = people}); 
    this.otherPeople = this.allPeople.filter(x => !people.includes(x.id) ); 
    // $(document).ready(() => {
    //   autosize($('.autosize'));
    // });
   }

}
