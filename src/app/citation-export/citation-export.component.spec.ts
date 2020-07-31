import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitationExportComponent } from './citation-export.component';

describe('CitationExportComponent', () => {
  let component: CitationExportComponent;
  let fixture: ComponentFixture<CitationExportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitationExportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitationExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
