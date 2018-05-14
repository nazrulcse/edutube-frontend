import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { TokenStorage } from './token-storage.service';
import { environment } from "../../environments/environment";

@Injectable()
export class AuthenticationService {

  base_url = "";
  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorage
  ) {
    this.base_url = environment.api_url;
  }

  /**
   * Check, if user already authorized.
   * @description Should return Observable with true or false values
   * @returns {Observable<boolean>}
   * @memberOf AuthService
   */
  public isAuthorized(): boolean {
    let token = this.tokenStorage
      .getAccessToken();
    return !!token;
  }

  /**
   * get auth headers
   * @returns {HttpHeaders}
   * @memberOf AuthService
   */

   public getAuthHeader() {
      const headers = new HttpHeaders()
        .set('Authorization', 'Bearer ' + this.getAccessToken());
      return headers;
   }

  /**
   * Get access token
   * @description Should return access token in Observable from e.g.
   * localStorage
   * @returns {Observable<string>}
   */
  public getAccessToken(): string {
    return this.tokenStorage.getAccessToken();
  }

  /**
   * Get user data
   * @description Should return user data stored during signin.
   * localStorage
   * @returns {UserData<JSON>}
   */
  public getAuthUser(): any {
    return this.tokenStorage.getUserData();
  }

  /**
   * Get user data
   * @description Should return user data stored during signin.
   * localStorage
   * @returns {UserData<JSON>}
   */
  public setAuthUser(user): any {
    return this.tokenStorage.setUserData(user);
  }

  /**
   * Get auth user data
   * @description Should return user data from API.
   * localStorage
   * @returns {UserData<JSON>}
   */
  public me(): Observable<any> {
    return this.http.get(this.base_url + "/api/auth/me", {headers: this.getAuthHeader()});
  }

  /**
   * Function, that should perform refresh token verifyTokenRequest
   * @description Should be successfully completed so interceptor
   * can execute pending requests or retry original one
   * @returns {Observable<any>}
   */
  // public refreshToken(): Observable < AccessData > {
  //   return this.tokenStorage
  //     .getRefreshToken()
  //     .switchMap((refreshToken: string) => {
  //       return this.http.post(`http://localhost:3000/refresh`, { refreshToken });
  //     })
  //     .do(this.saveAccessData.bind(this))
  //     .catch((err) => {
  //       this.logout();

  //       return Observable.throw(err);
  //     });
  // }

  /**
   * Function, checks response of failed request to determine,
   * whether token be refreshed or not.
   * @description Essentialy checks status
   * @param {Response} response
   * @returns {boolean}
   */
  public refreshShouldHappen(response: HttpErrorResponse): boolean {
    return response.status === 401
  }

  /**
   * Verify that outgoing request is refresh-token,
   * so interceptor won't intercept this request
   * @param {string} url
   * @returns {boolean}
   */
  public verifyTokenRequest(url: string): boolean {
    return url.endsWith('/refresh');
  }

  /**
   * EXTRA AUTH METHODS
   */

  public registration(data): Observable<any> {
    return this.http.post(this.base_url + "/api/auth/register", data);
  }

  /**
   * EXTRA AUTH METHODS
   */

  public login(credential): Observable<any> {
    return this.http.post(this.base_url + "/api/auth/login", credential);
  }

  /**
  * Social login
  *
  */

  public socialLogin(data): Observable<any> {
    return this.http.post(this.base_url + "/api/auth/social_login", data);
  }

  /**
   * recover password
   */

  public recover(email): Observable<any> {
    return this.http.post(this.base_url + "/api/auth/recover", {email: email});
  }

  /**
   * Logout
   */
  public logout(): void {
    this.tokenStorage.clear();
    // location.reload(true);
  }

  /**
   * Save access data in the storage
   *
   * @private
   * @param token data
   */
  public saveAccessData(accessToken, refreshToken, user) {
    this.tokenStorage
      .setAccessToken(accessToken)
      .setRefreshToken(refreshToken)
      .setUserData(user);
  }

}