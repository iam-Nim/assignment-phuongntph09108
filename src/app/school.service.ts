import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const schoolApiUrl='https://5e7863fa491e9700162ddfd8.mockapi.io/schools';

@Injectable()
export class SchoolService {

constructor(private http : HttpClient) { }

  getListSchool(): Observable<any>{
    return this.http.get<any>(schoolApiUrl);
  }

  getschoolById(id): Observable<any>{
    let url = `${schoolApiUrl}/${id}`;
    return this.http.get<any>(url);
  }

  removeSchoolById(id): Observable<any>{
    let url = `${schoolApiUrl}/${id}`;
    return this.http.delete<any>(url);
  }

  editSchool(obj): Observable<any>{
    let url = `${schoolApiUrl}/${obj.id}`;
    return this.http.put<any>(url, obj)
  }

  addNewSchool(obj): Observable<any>{
    return this.http.post<any>(schoolApiUrl, obj);
  }
}