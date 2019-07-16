import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  loader: boolean = true;
  products: Array<object>;
  id: string;
  constructor(
    private http : HttpClient,
    private activeRoute : ActivatedRoute,
    public sanitizer: DomSanitizer) {
    let takeId = this.activeRoute.queryParams.subscribe(res=>{
      this.id = res.id;
    });

    this.http.get(environment.baseUrl+'products.php?id='+this.id, {responseType: 'json'}).subscribe(res => {
      this.products = res['products'];
    },
    err =>{
      console.log(err.error);
      
    },
    ()=>{
      this.loader = !this.loader;
    });
   }

  ngOnInit() {
  }

}
