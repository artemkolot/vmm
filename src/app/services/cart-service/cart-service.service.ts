import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NumberValueAccessor } from '@angular/forms/src/directives';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {
 
  public productsCount: number = 0;

  constructor() { 

  }


  private productSubject = new BehaviorSubject ({});
  public _productSubject = this.productSubject.asObservable();
  set setProduct(product: any){
    this.productSubject.next(product);
  }
  set setCount(countProduct: number){
    this.productSubject.next(countProduct);
    this.productsCount=countProduct;
  }
}
