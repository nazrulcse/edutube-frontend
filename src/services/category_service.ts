import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { AuthenticationService } from '../app/authentication/authentication.service';
import { environment } from "../environments/environment";

@Injectable()
export class CategoryService {
  base_url = "";
  constructor(private http: HttpClient) {
    this.base_url = environment.api_url;
  }

  /**
   * Load category with course list
   * @description category data from API.
   * 
   * @returns {Category<JSON>}
  */
  public getCategory(id): Observable<any> {
    return this.http.get(this.base_url + "/api/auth/categories/" + id);
  }
}