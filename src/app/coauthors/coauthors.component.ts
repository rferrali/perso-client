import { Component, OnInit } from '@angular/core';
import { Person } from '../model'; 
import { StoreService } from '../store.service';

@Component({
  selector: 'app-coauthors',
  templateUrl: './coauthors.component.html',
  styleUrls: ['./coauthors.component.css']
})
export class CoauthorsComponent implements OnInit {

  // people: Person[]; 
  person: Person; 
  newPerson = new Person; 
  deleteMode = false; 
  editMode = false; 

  constructor(
    public store: StoreService
  ) { }

  ngOnInit() {
    // this.store.people.subscribe(
    //   res => {this.people = res;} 
    // ); 
  }

  // getPeople(): void {
  //   this.store.getPeople()
  //       .subscribe(people => {
  //         this.people = people; 
  //       });
  // }

  clickPerson(person: Person): void {
    if(this.deleteMode) {
      this.store.deletePerson(person); 
    } else {
      this.person = person; 
      this.editMode = true; 
    }
  }
}
