import { Component, OnInit } from '@angular/core';
import { Software } from '../model'; 
import { StoreService } from '../store.service'; 
import { AuthenticationService } from '../authentication.service'; 

@Component({
  selector: 'app-softwares',
  templateUrl: './softwares.component.html',
  styleUrls: ['./softwares.component.css']
})
export class SoftwaresComponent implements OnInit {

  softwares: Software[]; 
  createMode = false; 
  deleteMode = false; 
  sortMode = false; 
  editMode = false; 
  disableEdit = false; 
  newSoftware = new Software; 

  constructor(
    private store: StoreService, 
    public auth: AuthenticationService
  ) { }

  ngOnInit() {
    this.store.softwares.subscribe(softwares => {this.softwares = softwares}); 
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
    this.store.deleteSoftware(event); 
  }

  onSort(): void {
    this.sortMode = ! this.sortMode; 
    if(!this.sortMode) {
      let len = this.softwares.length;
      var i; 
      for (i=0; i<len; i++) {
        this.softwares[i].order = i; 
      }
      this.store.updateSoftwares(this.softwares);
    }
  }

}
