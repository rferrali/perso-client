import { Component, OnInit } from '@angular/core';
import { Course } from '../model'; 
import { StoreService } from '../store.service'; 
import { ListablesComponent } from '../listables.component'; 

@Component({
  selector: 'app-teaching',
  templateUrl: './teaching.component.html',
  styleUrls: ['./teaching.component.css']
})
export class TeachingComponent extends ListablesComponent<Course> implements OnInit {

  c = Course; 

  constructor(
    public store: StoreService
  ) { super(store) }

  ngOnInit() {
    this.store.courses.subscribe(courses => {this.objects = courses}); 
  }

}
