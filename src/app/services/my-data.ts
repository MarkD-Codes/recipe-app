import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class MyData {

  constructor(private storage: Storage){
    this.init();
  }

  async init(){
    await this.storage.create();
  }

  async set(key:string, value:any){
    //sets a key value pair in storage, in our case, k:ingredients v:list of ingredients
    await this.storage.set(key, value);
  }

  async get(key:string){
    //gets a value by key from storage - in our case, a list of ingredients
    return await this.storage.get(key);
  }
  
}
