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

  ngOnInit() { }

  deletePerson(person: Person) {
    this.store.deletePerson(person); 
  }

  clickPerson(person?: Person): void {
    this.person = person ? person : new Person;
    this.editMode = true; 
  }
}
