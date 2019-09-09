import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Ability } from '../model/ability';
import { AbilityData } from '../data/ability-data';
import { Observable, of } from 'rxjs';

@Injectable()
export class AbilityService {

  constructor(
    private http: HttpClient
  ) { }

  getAbilities(): Observable<Ability[]> {
    return of(AbilityData);
  }

  getAbility(id: number): Observable<Ability> {
    return of(AbilityData.find(x => x.id === id));
  }
}
