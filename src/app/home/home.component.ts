import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  public title: string;
  public time: string;

  constructor() { }

  ngOnInit(): void {
    this.title = 'Home';
    this.time = new Date().toISOString();
  }

}
