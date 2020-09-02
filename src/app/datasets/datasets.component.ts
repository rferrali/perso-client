import { Component, OnInit } from '@angular/core';
import { Dataset } from '../model'; 
import { StoreService } from '../store.service'; 
import { AuthenticationService } from '../authentication.service'; 
import { ListablesComponent } from '../listables.component'; 

@Component({
  selector: 'app-datasets',
  templateUrl: './datasets.component.html',
  styleUrls: ['./datasets.component.scss']
})
export class DatasetsComponent extends ListablesComponent<Dataset> implements OnInit {

  c = Dataset

  constructor(
    public store: StoreService
  ) { super(store) }

  ngOnInit() {
    this.store.datasets.subscribe(datasets => {
      this.objects = datasets; 
    }); 
  }

}
