import { Component, OnInit } from '@angular/core';
import { Paper, Keyword } from '../model'; 
import { StoreService } from '../store.service'; 
import { ListablesComponent } from '../listables.component'; 

@Component({
  selector: 'app-research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.css']
})
export class ResearchComponent extends ListablesComponent<Paper> implements OnInit {

  c = Paper; 

  constructor(
    public store: StoreService
  ) { super(store) }

  ngOnInit() {
    this.store.papers.subscribe(papers => {
      if(papers.length > 0) {
        let type = null as string;
        let j = -1;
        this.objects = [];
        for (let i = 0; i < papers.length; i++) {
          const paper = papers[i];
          if(paper.type != type) {
            type = paper.type; 
            this.objects.push({objects: [paper], form: this.makeTypeForm(type), editable: false});
            j++
          } else {
            this.objects[j].objects.push(paper);
          }
        }
      }
    }); 
  }

}
