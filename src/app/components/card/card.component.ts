import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CartServiceService } from '../../services/cart-service/cart-service.service';
import { IdbService } from 'src/app/services/idb.service';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  
  card: Array<object>;
  id: string;
  checkProductStatus: boolean = true;
  statusText : string = "Добавить в корзину";
  
  constructor(
    private http : HttpClient,
    private activeRoute : ActivatedRoute,
    private cartService : CartServiceService,
    private  idb: IdbService) {
      let takeId = this.activeRoute.queryParams.subscribe(res=>{
        this.id = res.id;
      });
      
      this.http.get(environment.baseUrl+'card.php?id='+this.id, {responseType: 'json'}).subscribe(res => {
        this.card = res['card'];
        this.card = this.card['0'];
      });
      
      this.cartService._productSubject.subscribe(res=>{
        // console.log(res);
      });
      
      takeId.unsubscribe();
    }
    
    changeStatus(e: Event, id: number){
      e.preventDefault();
      this.checkProductStatus = !this.checkProductStatus;
      let productsArray;
      this.idb.get('Products').then(res=>{
        productsArray = res;
      }).then(()=>{
        if(this.checkProductStatus){
          productsArray.length = productsArray.length-1;
          this.statusText = "Добавить в корзину";
          this.idb.set('Products', productsArray).then(res=>{
            console.log('set', res);
          })
          this.cartService.setCount = this.cartService.productsCount+1;
        } else{
          productsArray.push(this.id);
          this.idb.set('Products', productsArray).then(res=>{
            console.log('set', res);
          })
          this.statusText = "Удалить из корзины";
          this.cartService.setCount = this.cartService.productsCount-1;
        }
        this.cartService.setProduct=id;
      }
      )
    }
    ngOnInit() {
    }
    
  }
  