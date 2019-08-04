import { Component, OnInit } from '@angular/core';
import { CartServiceService } from '../../services/cart-service/cart-service.service';
import { IdbService } from 'src/app/services/idb.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  countProduct : number;

  constructor( 
    public cartService : CartServiceService,
    public idb: IdbService ) {
    this.countProduct = this.cartService.productsCount;
    this.idb.obsProducts$.subscribe(res=>{
      this.countProduct = res.length;
    })
   }

  ngOnInit() {

  }

}
