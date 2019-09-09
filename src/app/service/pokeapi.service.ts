import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable()
export class PokeApiService {

  constructor(
    private http: HttpClient
  ) { }

  getFromApi(url: string): Observable<any> {
    return this.http.get(url);
  }
}
