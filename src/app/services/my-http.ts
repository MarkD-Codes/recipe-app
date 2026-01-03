import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpOptions } from '@capacitor/core';

@Injectable({
  providedIn: 'root',
})
export class MyHttp {
  constructor() {}

  async get(options: HttpOptions){
    console.log("HTTP GET URL: ", options.url);
    return await CapacitorHttp.get(options);
  }
  
}
