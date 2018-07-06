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
   * get assesment of a lecture.
   * @description Should return lecture data from API as JSON.
   * @returns {Data<JSON>}
   */
  public getAssesment(lecture_id): Observable<any> {
    return this.http.get(this.base_url + "/api/auth/lectures/" + lecture_id + "/assesments");
  }
}