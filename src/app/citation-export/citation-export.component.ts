import { Component, OnInit, Input, HostListener } from '@angular/core';

@Component({
  selector: '[app-citation-export]',
  templateUrl: './citation-export.component.html',
  styleUrls: ['./citation-export.component.scss']
})
export class CitationExportComponent implements OnInit {

  @Input() citation: string;

  @HostListener('click')
  onClick() {
    
 }

  constructor() { }

  ngOnInit() {
  }

  copy() {
    navigator.clipboard.writeText(this.citation)
  }

}
