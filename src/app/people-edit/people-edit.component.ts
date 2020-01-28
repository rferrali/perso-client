import { Component, OnInit, Input } from '@angular/core';
import { Person } from '../model'; 
import { FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-people-edit',
  templateUrl: './people-edit.component.html',
  styleUrls: ['./people-edit.component.css']
})
export class PeopleEditComponent implements OnInit {

  @Input() editMode: boolean; 
  @Input() people: Person[]; 
  @Input() peopleForm: FormArray; 
  @Input() sortablePeople: any; 
  @Input() otherPeople: any; 
  peopleMode = false; 

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
  }

  addPerson(person: Person): void {
    this.peopleForm.push(this.fb.group(person)); 
    this.sortablePeople = this.peopleForm.value;
    this.otherPeople = this.otherPeople.filter(x => x.id != person.id); 
  }

  deletePerson(id: number): void {
    let author = this.peopleForm.at(id).value as Person; 
    this.otherPeople.push(author); 
    this.peopleForm.removeAt(id); 
    this.sortablePeople = this.peopleForm.value;
  }

  sortPeople(event: any): void {
    this.peopleForm.setValue(this.sortablePeople);
    }

}
