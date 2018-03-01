import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RssFeedEditorComponent } from './rss-feed-editor.component';

describe('RssFeedEditorComponent', () => {
  let component: RssFeedEditorComponent;
  let fixture: ComponentFixture<RssFeedEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RssFeedEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RssFeedEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
