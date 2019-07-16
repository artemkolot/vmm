import { Component, OnInit } from '@angular/core';
import { CartServiceService } from '../../services/cart-service/cart-service.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  countProduct : number;

  constructor( public cartService : CartServiceService ) {
    this.countProduct = this.cartService.productsCount;
   }

  ngOnInit() {

  }

}
