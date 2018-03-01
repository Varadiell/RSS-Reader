import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsViewerComponent } from './news-viewer.component';

describe('NewsViewerComponent', () => {
  let component: NewsViewerComponent;
  let fixture: ComponentFixture<NewsViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
