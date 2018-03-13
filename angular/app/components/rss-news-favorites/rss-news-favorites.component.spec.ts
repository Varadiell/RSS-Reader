import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RssNewsFavoritesComponent } from './rss-news-favorites.component';

describe('RssNewsFavoritesComponent', () => {
  let component: RssNewsFavoritesComponent;
  let fixture: ComponentFixture<RssNewsFavoritesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RssNewsFavoritesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RssNewsFavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
