import { Injectable } from '@angular/core';
import { Ability } from '../model/ability';
import { AbilityData } from '../data/ability-data';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class AbilityService {

  constructor() { }

  getAbalities(): Observable<Ability[]> {
    return of(AbilityData);
  }

  getAbility(id: number): Observable<Ability> {
    return of(AbilityData.find(x => x.id === id));
  } 
}
