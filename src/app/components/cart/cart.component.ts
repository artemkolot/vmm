import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { IdbService } from 'src/app/services/idb.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    let data = {
      test: [1,2]
    }
    this.http.post(environment.baseUrl+'cart.php', data, {responseType: 'json'}).subscribe(res => {
      console.log(res);
    });
  }

}
