import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class SearchUsersService {

  private searchUsersEndPoint = 'https://api.github.com/search/users?q=';
  private getUserDetailsEndPoint = 'https://api.github.com/users/';

  constructor(private http: Http) {
  }

  getUsersByPlaceAndLanguage(place: string, language: string, page = 1) {
    let url;
    if (place && !language) {
      url = `${this.searchUsersEndPoint}location:${place}&page=${page}`;
    } else if (!place && language) {
      url = `${this.searchUsersEndPoint}language:${language}&page=${page}`;
    } else {
      url = `${this.searchUsersEndPoint}location:${place}+language:${language}&page=${page}`;
    }

    return this.http.get(url)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getDetailsByUserName(userName: string) {
    if (userName) {
      const url = `${this.getUserDetailsEndPoint}${userName}`;
      return this.http.get(url)
        .map((res: Response) => res.json())
        .catch(this.handleError);
    }
  }

  getRepos(userName: string) {
    if (userName) {
      const url = `${this.getUserDetailsEndPoint}${userName}/repos`;
      return this.http.get(url)
        .map((res: Response) => res.json())
        .catch(this.handleError);
    }
  }

  private extractData(res: Response) {
    const body = res.json();
    return body.items || {};
  }

  private handleError(error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
