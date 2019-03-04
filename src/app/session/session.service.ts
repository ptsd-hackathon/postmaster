import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class SessionService {

  constructor(private storage: Storage) { }

  setSessionValue(key: string, value: string) {
    this.storage.set(key, value);
  }

  async getSessionValue(key: string){
    return await this.storage.get(key);
  }

  // this.sessionService.getSessionValue('userEmail').then((val) => {
  //   take val
  //   });
}
