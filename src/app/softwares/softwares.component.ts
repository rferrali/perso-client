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
  edittedId: number;
  createMode = false; 
  deleteMode = false; 
  sortMode = false; 
  editMode = false; 
  disableEdit = false; 
  newSoftware = new Software; 
  mode = 'none';

  constructor(
    private store: StoreService, 
    public auth: AuthenticationService
  ) { }

  ngOnInit() {
    this.store.softwares.subscribe(softwares => {this.softwares = softwares}); 
  }

  modeSelect(e: string) {
    if(this.mode == 'sort' && e == 'none') {
      let len = this.softwares.length;
      var i; 
      for (i=0; i<len; i++) {
        this.softwares[i].order = i; 
      }
      this.store.updateSoftwares(this.softwares);
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

  onDelete(event: Software): void {
    this.store.deleteSoftware(event); 
  }

}
