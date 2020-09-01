import { Component, OnInit, Input } from '@angular/core';
import { Keyword } from '../model'; 
import { StoreService } from '../store.service'; 
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-keywords-select',
  templateUrl: './keywords-select.component.html',
  styleUrls: ['./keywords-select.component.scss']
})
export class KeywordsSelectComponent implements OnInit {

  kFilter: string; 
  keywords: Keyword[]

  constructor(
    private store: StoreService, 
    private route: ActivatedRoute, 
    private router: Router
  ) { 
    this.route.url.subscribe(url => {
      this.kFilter = url.length == 2 ? url[1].path : undefined; 
    });
   }

  ngOnInit() {
    this.store.keywords.subscribe(x => {
      this.keywords = x; 
    }); 
  }

  test(keyword: Keyword): boolean {
    if(!this.kFilter) {
      return false; 
    } else {
      return this.kFilter == keyword.slug; 
    }
  }

  goTo(keyword?: Keyword): void {
    if(keyword) {
      this.router.navigate(['/research', keyword.slug]); 
    } else {
      this.router.navigate(['/research']); 
    }
    
  }

}
