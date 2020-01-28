import { Component, OnInit } from '@angular/core';
import { Dataset } from '../model'; 
import { StoreService } from '../store.service'; 
import { AuthenticationService } from '../authentication.service'; 

@Component({
  selector: 'app-datasets',
  templateUrl: './datasets.component.html',
  styleUrls: ['./datasets.component.scss']
})
export class DatasetsComponent implements OnInit {

  datasets: Dataset[]; 
  createMode = false; 
  deleteMode = false; 
  sortMode = false; 
  editMode = false; 
  disableEdit = false; 
  newDataset = new Dataset; 

  constructor(
    private store: StoreService, 
    public auth: AuthenticationService
  ) { }

  ngOnInit() {
    this.store.datasets.subscribe(datasets => {
      this.datasets = datasets; 
    }); 
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
    this.store.deleteDataset(event); 
  }

  // onSort(): void {
  //   this.sortMode = ! this.sortMode; 
  //   if(!this.sortMode) {
  //     let len = this.datasets.length;
  //     var i; 
  //     for (i=0; i<len; i++) {
  //       this.datasets[i].order = i; 
  //     }
  //     this.store.updateSoftwares(this.datasets);
  //   }
  // }

}
