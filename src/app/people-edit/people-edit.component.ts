import { Component, OnChanges, Input } from '@angular/core';
import { Person } from '../model'; 
import { FormArray, FormBuilder } from '@angular/forms';
import { StoreService } from '../store.service'; 

@Component({
  selector: 'app-people-edit',
  templateUrl: './people-edit.component.html',
  styleUrls: ['./people-edit.component.css']
})
export class PeopleEditComponent implements OnChanges {

  @Input() editable: boolean; 
  allPeople: Person[]; 
  people: Person[]; 
  @Input() peopleForm: FormArray; 
  thisPerson: Person;
  showTypeahead = false;

  get otherPeople(): Person[] {
    return this.allPeople.filter(person => ! this.people.map(p => p.id).includes(person.id))
  }

  get otherPeopleTypeahead(): {full_name: string, person: Person}[] {
    return this.otherPeople.map(p => {
      return {
        full_name: p.first_name + ' ' + p.last_name, 
        person: p
      }
    });
  }

  constructor(
    private fb: FormBuilder, 
    private store: StoreService
  ) { }

  ngOnChanges() {
    this.store.people.subscribe(people => this.allPeople = people);
    this.people = this.peopleForm.value;
  }

  onSelect(event: any) {
    this.addPerson(event.item.person);
    this.showTypeahead = false;
    this.thisPerson = undefined;
  }

  addPerson(person: Person): void {
    this.peopleForm.push(this.fb.group(person)); 
    this.people = this.peopleForm.value;
  }

  deletePerson(id: number): void {
    this.peopleForm.removeAt(id); 
    this.people = this.peopleForm.value;
  }

  sortPeople(event: any): void {
    this.peopleForm.setValue(this.people);
    }

}
