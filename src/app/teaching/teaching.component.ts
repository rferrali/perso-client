import { Component, OnInit } from '@angular/core';
import { Course } from '../model'; 
import { StoreService } from '../store.service'; 
import { AuthenticationService } from '../authentication.service'; 

@Component({
  selector: 'app-teaching',
  templateUrl: './teaching.component.html',
  styleUrls: ['./teaching.component.css']
})
export class TeachingComponent implements OnInit {

  courses: Course[]; 
  createMode = false; 
  deleteMode = false; 
  sortMode = false; 
  editMode = false; 
  disableEdit = false; 
  newCourse = new Course; 

  constructor(
    private store: StoreService, 
    public auth: AuthenticationService
  ) { }

  ngOnInit() {
    this.store.courses.subscribe(courses => {this.courses = courses}); 
  }

  onEdit(event: boolean): void {
    this.editMode = event; 
    this.disableEdit = event;
    if(!this.editMode) {
      this.createMode = false; 
    }
  }

  onCreate(): void {
    this.editMode = false; 
    this.deleteMode = false; 
    this.sortMode = false; 
    this.createMode = true; 
    this.disableEdit = true; 
  }

  onDelete(): void {
    this.deleteMode = !this.deleteMode; 
    this.editMode = false; 
    this.sortMode = false; 
    this.createMode = false; 
    this.disableEdit = !this.disableEdit; 
  }

  onDeleteEvent(event: any): void {
    this.store.deleteCourse(event); 
  }

  onSort(): void {
    this.sortMode = ! this.sortMode; 
    if(!this.sortMode) {
      let len = this.courses.length;
      var i; 
      for (i=0; i<len; i++) {
        this.courses[i].order = i; 
      }
      this.store.updateCourses(this.courses);
    }
  }

}
