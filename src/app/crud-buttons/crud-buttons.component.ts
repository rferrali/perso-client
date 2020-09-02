import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-crud-buttons',
  templateUrl: './crud-buttons.component.html',
  styleUrls: ['./crud-buttons.component.scss']
})
export class CrudButtonsComponent implements OnInit {

  @Input() object: string;
  @Input() mode: string;
  @Output() modeSelect = new EventEmitter<string>()
  _group: boolean;
  @Input() get group() {
    return this._group;
  }
  set group(value: any) {
    this._group = !(value === undefined);
  }

  constructor() { }

  ngOnInit() {
  }

  onClick(mode: string) {
    const newMode = mode == this.mode ? 'none' : mode; 
    this.modeSelect.emit(newMode);
  }

}
