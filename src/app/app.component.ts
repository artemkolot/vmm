import { Component, OnInit } from '@angular/core';
import { IdbService } from './services/idb.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'вмм';
  test: IdbService;
  indexedDB = window.indexedDB;
  
  ngOnInit(){
    this.test = new IdbService()
  }
  
  constructor() {
  }
  
}

