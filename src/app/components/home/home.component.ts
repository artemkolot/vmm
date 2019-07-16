import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  models:  Array<object>;
  modelsGet: boolean;
  loader: boolean = true;
  constructor(private http : HttpClient){
  }
  ngOnInit() {
    let unsub = this.http.get(environment.baseUrl+'models.php', {responseType: 'json'}).subscribe(res => {
      this.models = res['models'];
      this.loader = false;
    },
    err =>{
      console.log(err.error);
    },
    ()=>{
      this.loader = false;
    });
  }

}