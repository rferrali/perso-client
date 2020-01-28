import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoauthorsComponent } from './coauthors.component';

describe('CoauthorsComponent', () => {
  let component: CoauthorsComponent;
  let fixture: ComponentFixture<CoauthorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoauthorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoauthorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
