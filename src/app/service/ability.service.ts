import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Ability } from '../model/ability';
import { AbilityData } from '../data/ability-data';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class AbilityService {

  constructor(
    private http: HttpClient
  ) { }

  getAbalities(): Observable<Object> {
    return this.http.get('/api/ability-list');
  }

  getAbility(id: number): Observable<Ability> {
    return of(AbilityData.find(x => x.id === id));
  }
}
