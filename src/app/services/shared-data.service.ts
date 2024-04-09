import { Injectable } from '@angular/core';
import { Dummy } from '../models/Dummy';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  sharedObject: any = {
    telaAlgodon: 333,
    telaSeda: 368,
    telaLino: 280,
    telaEncaje: 137,
  }

  constructor() { }

  setSharedObject(obj: any) {
    this.sharedObject = obj;
  }

  getSharedObject() {
    return this.sharedObject;
  }
}
