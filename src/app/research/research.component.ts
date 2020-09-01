import { Component, OnInit } from '@angular/core';
import { Paper, Keyword } from '../model'; 
import { StoreService } from '../store.service'; 
import { AuthenticationService } from '../authentication.service'; 
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

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
  createMode = false; 
  deleteMode = false; 
  sortMode = false; 
  editMode = false; 
  disableEdit = false; 
  newPaper = new Paper; 
  kFilter: Keyword; 
  title = 'Research'; 
  subtitle = 'My research'; 
  mode = 'none';
  edittedId: number;

  constructor(
    private store: StoreService, 
    public auth: AuthenticationService, 
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.data.pipe(
      switchMap((data: { keyword?: Keyword }) => {
        this.kFilter = data.keyword; 
        return this.store.papers; 
      })
    ).subscribe((papers: Paper[]) => {
      this.papers = papers; 
      this.papers0 = papers.filter(x => x.type == 0); 
      this.papers1 = papers.filter(x => x.type == 1); 
      this.papers2 = papers.filter(x => x.type == 2); 
      if(this.kFilter) {
        this.papers = this.papers.filter(
          x => {
            if(x.keywords.length == 0) {
              return false; 
            } else {
              return x.keywords.findIndex(y => y.slug == this.kFilter.slug) != -1
            }
          }
        )
      }
    }); 
  }

  modeSelect(e: string) {
    if(this.mode == 'sort' && e == 'none') {
      let len = this.papers.length;
      var i; 
      for (i=0; i<len; i++) {
        this.papers[i].order = i; 
      }
      this.store.updatePapers(this.papers);
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
    this.sortMode = ! this.sortMode; 
    if(!this.sortMode) {
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

}
