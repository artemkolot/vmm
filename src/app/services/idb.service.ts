import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IdbService {

  constructor() { 
    this.initialize();
    let suqa = this.set('Products', []).then(res=>{
      this.get('Products').then(res=>{
        this.setProduct = res;
      });
    });
  }
  
  private obsProducts = new BehaviorSubject('');
  public obsProducts$ = this.obsProducts.asObservable();
  public set setProduct(product) {
    this.obsProducts.next(product);
    console.log(product);
  }
  
  initialize () {
    return new Promise(() => {
      const request = indexedDB.open('Products');
      request.onupgradeneeded = function() {
        request.result.createObjectStore('user_request_profile');          
      };
      request.onerror = function() {
        console.log(request.error);
      };
    });
  };
  
  databaseExists(dbname, callback) {
    const req = indexedDB.open(dbname);
    let existed = true;
    req.onsuccess = function () {
      req.result.close();
      if (!existed)
      indexedDB.deleteDatabase(dbname);
      callback(existed);
    };
    req.onupgradeneeded = function () {
      existed = false;
    };
  }
  
  get(key) {
    return new Promise((resolve) => {
      const oRequest = indexedDB.open('Products');
      oRequest.onsuccess = function() {
        const db = oRequest.result;
        const tx = db.transaction('user_request_profile', 'readonly');
        const st = tx.objectStore('user_request_profile');
        const gRequest = st.get(key);
        gRequest.onsuccess = function() {
          resolve(gRequest.result);
        };
        gRequest.onerror = function() {
          
        };
      };
      oRequest.onerror = function() {
        
      };
    });
  }
  
  set(key, value) {
    let self = this;
    return new Promise((resolve) => {
      const oRequest = indexedDB.open('Products');
      oRequest.onsuccess = function() {
        const db = oRequest.result;
        const tx = db.transaction('user_request_profile', 'readwrite');
        const st = tx.objectStore('user_request_profile');
        const sRequest = st.put(value, key);
        self.setProduct = value;
        sRequest.onsuccess = function() {
          resolve();
        };
        sRequest.onerror = function() {
        };
      };
      oRequest.onerror = function() {
      };
    });
  }
  
  drop () {
    return new Promise((resolve, reject) => {
      const oRequest = indexedDB.deleteDatabase('OfflineDatabase');
      oRequest.onsuccess = function() {
        resolve();
      },
      oRequest.onerror = function() {
        reject();
      };
    });
  }
  
  clear () {
    return new Promise((resolve, reject) => {
      const dbPromise = indexedDB.open('OfflineDatabase');
      dbPromise.onsuccess = function () {
        const db = dbPromise.result;
        const tx = db.transaction('user_request_profile', 'readwrite').objectStore('user_request_profile');
        tx.clear();
      };
    });
  }
}