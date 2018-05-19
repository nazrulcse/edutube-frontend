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
   * get course details of give id
   * @description Should return course details as json from API.
   * 
   * @returns {Course<JSON>}
   */
  public getCourseDetails(id): Observable<any> {
    return this.http.get(this.base_url + "/api/auth/courses/" + id + "/details");
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

  /**
   * Upload course file image or video
   * @description Should return user upload avatar data from API.
   * localStorage
   * @returns {UploadAvarat<JSON>}
   */
  public uploadFile(course_id, formData): Observable<any> {
    return this.http.post(this.base_url + "/api/auth/courses/" + course_id + "/upload_file", formData, {headers: this.authService.getAuthHeader()});
  } 

  /**
   * Add category to a course
   * @description Should return category from API as JSON.
   * localStorage
   * @returns {Category}
   */
  public addCategory(course_id, category_id): Observable<any> {
    return this.http.post(this.base_url + "/api/auth/courses/" + course_id + "/add_category", {category_id: category_id}, {headers: this.authService.getAuthHeader()});
  }

  /**
   * remove category to a course
   * @description Should return success response.
   * localStorage
   * @returns {Void}
   */
  public removeCategory(course_id, category_id): Observable<any> {
    return this.http.post(this.base_url + "/api/auth/courses/" + course_id + "/remove_category", {category_id: category_id}, {headers: this.authService.getAuthHeader()});
  }

  /**
   * Load categories of a course
   * @description Should return categories from API JSON array.
   * localStorage
   * @returns {Category<JSON>}
   */
  public loadCourseCategory(course_id): Observable<any> {
    return this.http.get(this.base_url + "/api/auth/courses/" + course_id + "/categories", {headers: this.authService.getAuthHeader()});
  }
}