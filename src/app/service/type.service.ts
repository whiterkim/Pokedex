import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Type } from '../model/pokemon';
import { NamedAPIResourceList } from '../model/utility';

@Injectable()
export class TypeService {

  constructor(
    private http: HttpClient
  ) { }

  types: Object = {};

  getTypes(): Promise<NamedAPIResourceList> {
      return <any> this.http.get("https://pokeapi.co/api/v2/type/");
  }

  getType(url: string): Promise<Type> {
    // if (this.types[url] === undefined) {
    //   this.types[url] === <any> this.http.get(url).toPromise();
    // }

    // return this.types[url];

    return <any> this.http.get(url).toPromise();
  }
}
