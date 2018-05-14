import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { AuthenticationService } from '../app/authentication/authentication.service';
import { environment } from "../environments/environment";

@Injectable()
export class CourseService {
  base_url = "";
  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) {
    this.base_url = environment.api_url;
  }

  /**
   * Create a new course
   * @description Should return course data from API.
   * localStorage
   * @returns {Course<JSON>}
   */
  public createCourse(data): Observable<any> {
    return this.http.post(this.base_url + "/api/auth/course/create", data, {headers: this.authService.getAuthHeader()});
  }

  /**
   * get all courses of a instructor
   * @description Should return all courses as json array from API.
   * 
   * @returns {Courses<JSON>}
   */
  public getCourses(): Observable<any> {
    return this.http.get(this.base_url + "/api/auth/courses", {headers: this.authService.getAuthHeader()});
  }

  /**
   * get course of give id
   * @description Should return course as json from API.
   * 
   * @returns {Course<JSON>}
   */
  public getCourse(id): Observable<any> {
    return this.http.get(this.base_url + "/api/auth/courses/" + id, {headers: this.authService.getAuthHeader()});
  }

  /**
   * update instructor course
   * @description Should return updated course as json from API.
   * @input Course id
   *
   * @returns {Course<JSON>}
   */
  public updateCourse(data): Observable<any> {
    return this.http.post(this.base_url + "/api/auth/course/" + data.id + "/update", data, {headers: this.authService.getAuthHeader()});
  }
}