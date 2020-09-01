import { Component, OnInit } from '@angular/core';
import { Paper, Keyword } from '../model'; 
import { StoreService } from '../store.service'; 
import { AuthenticationService } from '../authentication.service'; 

@Component({
  selector: 'app-research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.css']
})
export class ResearchComponent implements OnInit {

  papers: Paper[]; 
  papers0: Paper[]; 
  papers1: Paper[]; 
  papers2: Paper[]; 
  keywords: Keyword[]; 
  mode = 'none';
  edittedId: number;

  constructor(
    private store: StoreService, 
    public auth: AuthenticationService
  ) { }

  ngOnInit() {
    this.store.papers.subscribe(papers => {
      this.papers = papers; 
      this.papers0 = papers.filter(x => x.type == 0); 
      this.papers1 = papers.filter(x => x.type == 1); 
      this.papers2 = papers.filter(x => x.type == 2); 
    }); 
  }

  modeSelect(e: string) {
    if(this.mode == 'sort' && e == 'none') {
      this.onSort(); 
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

  onDelete(event: Paper): void {
    this.store.deletePaper(event); 
  }

  onSort(): void {
    this.papers0 = this.papers0.map(paper => {
      paper.type = 0; 
      return paper; 
    })
    this.papers1 = this.papers1.map(paper => {
      paper.type = 1; 
      return paper; 
    })
    this.papers2 = this.papers2.map(paper => {
      paper.type = 2; 
      return paper; 
    })
    const papers = this.papers2.concat(this.papers1).concat(this.papers0); 
    let len = papers.length;
    var i; 
    for (i=0; i<len; i++) {
      papers[i].order = i; 
    }
    this.store.updatePapers(papers);
  }

}
