import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { AuthenticationService } from '../app/authentication/authentication.service';
import { environment } from "../environments/environment";

@Injectable()
export class UserService {
  //base_url = "http://localhost:8000";
  base_url = "";
  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) {
    this.base_url = environment.api_url;
  }

  /**
   * Get auth user data
   * @description Should return user data from API.
   * localStorage
   * @returns {UserData<JSON>}
   */
  public updateProfile(user): Observable<any> {
    return this.http.post(this.base_url + "/api/auth/update_profile", user, {headers: this.authService.getAuthHeader()});
  }

  /**
   * Upload user avatar
   * @description Should return user upload avatar data from API.
   * localStorage
   * @returns {UploadAvarat<JSON>}
   */
  public uploadAvatar(formData): Observable<any> {
    return this.http.post(this.base_url + "/api/auth/upload_avatar", formData, {headers: this.authService.getAuthHeader()});
  }

  /**
   * get courses of an user
   * @description Should return user courses data from API.
   * localStorage
   * @returns {Course<JSON>}
   */
  public getCourses(): Observable<any> {
    return this.http.get(this.base_url + "/api/auth/courses", {headers: this.authService.getAuthHeader()});
  }

  /**
   * get user education list
   * @description Should return education as json array from API.
   *
   * @returns {Educations<JSON>}
   */
  public getEducations(): Observable<any> {
    return this.http.get(this.base_url + "/api/auth/educations", {headers: this.authService.getAuthHeader()});
  }

  /**
   * create user education
   * @description Should return education as json from API.
   *
   * @returns {Education<JSON>}
   */
  public createEducation(data): Observable<any> {
    return this.http.post(this.base_url + "/api/auth/education/create", data, {headers: this.authService.getAuthHeader()});
  }

  /**
   * update user education
   * @description Should return education as json from API.
   *
   * @returns {Education<JSON>}
   */
  public updateEducation(data): Observable<any> {
    return this.http.post(this.base_url + "/api/auth/education/" + data.id + "/update", data, {headers: this.authService.getAuthHeader()});
  }

  /**
   * get user experience list
   * @description Should return experience as json array from API.
   *
   * @returns {Educations<JSON>}
   */
  public getExperiences(): Observable<any> {
    return this.http.get(this.base_url + "/api/auth/experiences", {headers: this.authService.getAuthHeader()});
  }

  /**
   * create user experience
   * @description Should return experience as json from API.
   *
   * @returns {Education<JSON>}
   */
  public createExperience(data): Observable<any> {
    return this.http.post(this.base_url + "/api/auth/experience/create", data, {headers: this.authService.getAuthHeader()});
  }

  /**
   * update user experience
   * @description Should return experience as json from API.
   *
   * @returns {Education<JSON>}
   */
  public updateExperience(data): Observable<any> {
    return this.http.post(this.base_url + "/api/auth/experience/" + data.id + "/update", data, {headers: this.authService.getAuthHeader()});
  }

   /**
   * get user language list
   * @description Should return language as json array from API.
   * 
   * @returns {Language<JSON>}
   */
  public getLanguages(): Observable<any> {
    return this.http.get(this.base_url + "/api/auth/languages", {headers: this.authService.getAuthHeader()});
  }

  /**
   * create user language
   * @description Should return language as json from API.
   * 
   * @returns {Language<JSON>}
   */
  public createLanguage(data): Observable<any> {
    return this.http.post(this.base_url + "/api/auth/language/create", data, {headers: this.authService.getAuthHeader()});
  }

  /**
   * update user language
   * @description Should return language as json from API.
   * 
   * @returns {Language<JSON>}
   */
  public updateLanguage(data): Observable<any> {
    return this.http.post(this.base_url + "/api/auth/language/" + data.id + "/update", data, {headers: this.authService.getAuthHeader()});
  }

  /**
   * get user bank account info
   * @description Should return bank account information as json from API.
   *
   * @returns {BankAccount<JSON>}
   */
  public getBankAccount(): Observable<any> {
    return this.http.get(this.base_url + "/api/auth/bank_account", {headers: this.authService.getAuthHeader()});
  }

  /**
   * update/create user bank account information
   * @description Should return experience as json from API.
   *
   * @returns {BankAccount<JSON>}
   */
  public updateBankAccount(data): Observable<any> {
    return this.http.post(this.base_url + "/api/auth/bank_account/update", data, {headers: this.authService.getAuthHeader()});
  }

}
