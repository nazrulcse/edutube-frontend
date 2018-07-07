import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
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
   * get top courses
   * @description Should return course as json from API.
   * 
   * @returns {Course<JSON>}
   */
  public getTopCourses(): Observable<any> {
    return this.http.get(this.base_url + "/api/auth/top_courses");
  }

  /**
   * get top courses of different type
   * @description Should return courses from different category like top view, latest upload, top shared.
   * 
   * @returns {Course<JSON>}
   */
  public getCourse(id): Observable<any> {
    return this.http.get(this.base_url + "/api/auth/courses/" + id, {headers: this.authService.getAuthHeader()});
  }

  /**
   * get lecture by lecture id
   * @description Should return lecture details.
   * 
   * @returns {Lecture<JSON>}
   */
  public getLecture(course_id, id): Observable<any> {
    return this.http.get(this.base_url + "/api/auth/courses/" + course_id + "/lectures/" + id, {headers: this.authService.getAuthHeader()});
  }

  /**
   * delete course by id
   * @description Should delete course and return status.
   * 
   * @returns {Response<JSON>}
   */
  public deleteCourse(id): Observable<any> {
    return this.http.post(this.base_url + "/api/auth/courses/" + id + "/delete", {course_id: id}, {headers: this.authService.getAuthHeader()});
  }

  /**
   * get course details of give id
   * @description Should return course details as json from API.
   * 
   * @returns {Course<JSON>}
   */
  public getCourseDetails(id, category): Observable<any> {
    return this.http.get(this.base_url + "/api/auth/courses/" + id + "/details?category=" + category);
  }

  /**
   * get related courses of a course
   * @description Should return list of courses as json array from API.
   * 
   * @returns {Course<JSON>}
   */
  public getRelatedCourse(id): Observable<any> {
    return this.http.get(this.base_url + "/api/auth/courses/" + id + "/related_course");
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
   * Load course data like category, class, subject etc.
   * @description Should return course data from API JSON array.
   * localStorage
   * @returns {Data<JSON>}
   */
  public editCourse(course_id): Observable<any> {
    return this.http.get(this.base_url + "/api/auth/courses/" + course_id + "/edit_course", {headers: this.authService.getAuthHeader()});
  }

  /**
   * Load all lecture of a course.
   * @description Should return lecture data from API as JSON array.
   * @returns {Data<JSON>}
   */
  public getLectures(course_id): Observable<any> {
    return this.http.get(this.base_url + "/api/auth/courses/" + course_id + "/lectures", {headers: this.authService.getAuthHeader()});
  }

  /**
   * Update or create new lecture.
   * @description Should return lecture data from API as JSON.
   * @returns {Data<JSON>}
   */
  public updateLecture(course_id, lecture): Observable<any> {
    return this.http.post(this.base_url + "/api/auth/courses/" + course_id + "/update_lecture", lecture, {headers: this.authService.getAuthHeader()});
  }

  /**
   * Search course by class, subject etc.
   * @description Should return course data from API JSON array.
   * localStorage
   * @returns {Data<JSON>}
   */
  public search(params): Observable<any> {
    let qparams = new URLSearchParams();
    for(let key in params){
        qparams.set(key, params[key]) 
    }
    return this.http.get(this.base_url + "/api/auth/search?" + qparams.toString());
  }
}