import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  private static apiCache: Object = {};
  private static endpointUrls: Object;
  private static host: string = "https://pokeapi.co/api/v2/";

  async getFromUrl(url: string): Promise<any> {
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

  parseUrl(url: string): Object {
    if (url.match(ApiService.host).index !== 0) {
      return null;
    }
    let rest = url.substr(ApiService.host.length);
    let keys = rest.split('/');
    if (keys.length !== 3) {
      return null;
    }
    return {
      endpoint: keys[0],
      key: keys[1],
    };
  }

  async getUrl(endpoint: string) {
    if (!ApiService.endpointUrls) {
      ApiService.endpointUrls = await this.getFromUrl(ApiService.host);
    }
    return ApiService.endpointUrls[endpoint];
  }

  async getFromApi(endpoint: string, key?: string, params?: Object) {
    let url = await this.getUrl(endpoint);
    if (key) {
      url += key + '/';
    }
    if (params) {
      let paramStr = "";
      for (let key in params) {
          if (paramStr !== "") {
              paramStr += "&";
          }
          paramStr += key + "=" + params[key];
      }
      url += '?' + paramStr;
    }
    return await this.getFromUrl(url);
  }
}
