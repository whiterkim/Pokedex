import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Move } from '../model/move';
import { MoveData } from '../data/move-data';
import { Observable, of } from 'rxjs';

@Injectable()
export class MoveService {

  constructor(
    private http: HttpClient
  ) { }

  getMoves(): Observable<Move[]> {
    return of(MoveData);
  }

  getMove(id: number): Observable<Move> {
    return of(MoveData.find(x => x.id === id));
  }
}
