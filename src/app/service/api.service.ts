import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  static apiCache: Object = {};

  async get(url: string): Promise<any> {
    // Cache missed
    if (ApiService.apiCache[url] === undefined) {
      // Save the promise to cache
      ApiService.apiCache[url] = this.http.get(url).toPromise();
      // Save the actual object to cache when the promise resolved
      ApiService.apiCache[url] = await ApiService.apiCache[url];
    }

    // Cache hit
    return ApiService.apiCache[url];
  }

}
