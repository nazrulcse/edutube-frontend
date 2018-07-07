import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { AuthenticationService } from '../app/authentication/authentication.service';
import { environment } from "../environments/environment";

@Injectable()
export class AssesmentService {
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
    return this.http.get(this.base_url + "/api/auth/lectures/" + lecture_id + "/assessments");
  }

  /**
  * Create or update assesment
  * @return assesment data as json 
  *
  */
  public updateAssesment(assessment): Observable<any> {
    return this.http.post(this.base_url + "/api/auth/lectures/" + assessment.lecture_id + "/update_assessment", {title: assessment.title}, {headers: this.authService.getAuthHeader()});
  }

  /**
  * Create or update question with answer
  * @return assesment data as json 
  *
  */
  public updateQuestion(assessment, question): Observable<any> {
    return this.http.post(this.base_url + "/api/auth/lecture/assessment/" + assessment.id + "/update_question", question, {headers: this.authService.getAuthHeader()});
  }
}