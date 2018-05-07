import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { AuthenticationService } from '../app/authentication/authentication.service';

@Injectable()
export class UserService {

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) {}

  /**
   * Get auth user data
   * @description Should return user data from API.
   * localStorage
   * @returns {UserData<JSON>}
   */
  public updateProfile(user): Observable<any> {
    return this.http.post("http://localhost:8000/api/auth/update_profile", user, {headers: this.authService.getAuthHeader()});
  }
}