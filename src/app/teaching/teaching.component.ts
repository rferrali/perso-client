import { Component, OnInit } from '@angular/core';
import { Course } from '../model'; 
import { StoreService } from '../store.service'; 

@Component({
  selector: 'app-teaching',
  templateUrl: './teaching.component.html',
  styleUrls: ['./teaching.component.css']
})
export class TeachingComponent implements OnInit {

  courses: Course[]; 
  edittedId: number;
  mode = 'none';

  constructor(
    private store: StoreService
  ) { }

  ngOnInit() {
    this.store.courses.subscribe(courses => {this.courses = courses}); 
  }

  modeSelect(e: string) {
    if(this.mode == 'sort' && e == 'none') {
      let len = this.courses.length;
      var i; 
      for (i=0; i<len; i++) {
        this.courses[i].order = i; 
      }
      this.store.updateCourses(this.courses);
    }
    this.mode = e;  
  }

  onEdit(e: number): void {
    if(this.mode == 'none') {
      this.mode = 'edit';
      this.edittedId = e; 
    } else {
      this.mode = 'none';
      this.edittedId = null; 
    }
  }

  onDelete(event: Course): void {
    this.store.deleteCourse(event); 
  }

}
