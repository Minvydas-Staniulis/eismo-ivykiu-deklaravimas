import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  private baseUrl = 'http://127.0.0.1:8000/api/';

  newsData: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getNews();
  }

  getNews() {
    this.http.get(this.baseUrl + 'news').subscribe((data) => {
      this.newsData = data;
    });
  }
}
