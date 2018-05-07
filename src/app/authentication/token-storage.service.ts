import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class TokenStorage {

  /**
   * Get access token
   * @returns {Observable<string>}
   */
  public getAccessToken(): string {
    const token: string = <string>localStorage.getItem('accessToken');
    return token;
  }

  /**
   * Get refresh token
   * @returns {Observable<string>}
   */
  public getRefreshToken(): Observable<string> {
    const token: string = <string>localStorage.getItem('refreshToken');
    return of(token);
  }

  /**
   * Get user data
   * @returns {UserData<JSON>}
   */
  public getUserData() {
    let user: any = localStorage.getItem('userData');
    if(typeof(user) == "undefined" || user == "undefined") {
      return {};
    }
    else {
      return JSON.parse(user);
    }
  }

  /**
   * Set access token
   * @returns {TokenStorage}
   */
  public setAccessToken(token: string): TokenStorage {
    localStorage.setItem('accessToken', token);

    return this;
  }

  /** 
  * Set user data got from login api
  * @returns void
  */

  public setUserData(user) {
    localStorage.setItem('userData', JSON.stringify(user));
  }

   /**
   * Set refresh token
   * @returns {TokenStorage}
   */
  public setRefreshToken(token: string): TokenStorage {
    localStorage.setItem('refreshToken', token);

    return this;
  }

   /**
   * Remove tokens
   */
  public clear() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userdata');
  }
}