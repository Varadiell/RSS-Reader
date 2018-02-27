import { Component, OnInit } from '@angular/core';
import { RssFeed } from '../rssFeed';

@Component({
  selector: 'app-rss-feeds',
  templateUrl: './rss-feeds.component.html',
  styleUrls: ['./rss-feeds.component.css']
})
export class RssFeedsComponent implements OnInit {

  rssFeed: RssFeed = {
    id: 1,
    url: 'https://www.judgehype.com/nouvelles.xml',
    xml: null
  };

  constructor() { }

  ngOnInit() {
  }

}
