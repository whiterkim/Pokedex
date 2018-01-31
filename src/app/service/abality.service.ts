import { Injectable } from '@angular/core';
import { Abality } from '../model/abality';
import { AbalityData } from '../data/ability-data';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class AbalityService {

  constructor() { }

  getAbalities(): Observable<Abality[]> {
    return of(AbalityData);
  }

  getAbality(id: number): Observable<Abality> {
    return of(AbalityData.find(x => x.id === id));
  } 
}
