import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const schoolApiUrl='https://5e7863fa491e9700162ddfd8.mockapi.io/schools';

@Injectable()
export class ClassService {

  schoolid;

  constructor(private http: HttpClient) { }

  getClassBySchoolId(schoolId): Observable<any>{
     let url = `${schoolApiUrl}/${schoolId}/classes`;
    console.log(url);
    this.schoolid = schoolId;
    console.log(this.schoolid);
    return this.http.get<any>(url);

  }

  getDetailClassBySchoolId(classId): Observable<any>{
    let url = `${schoolApiUrl}/${this.schoolid}/classes/${classId}`;
    console.log(url);
    return this.http.get<any>(url);
  }

  editClass(obj): Observable<any>{
    let url = `${schoolApiUrl}/${this.schoolid}/classes/${obj.id}`
    return this.http.put<any>(url,obj);
  }

  addNewClass(obj): Observable<any>{
    let url= `${schoolApiUrl}/${this.schoolid}/classes`
    return this.http.post<any>(url,obj);
  }

  removeClass(classId): Observable<any>{
    let url= `${schoolApiUrl}/${this.schoolid}/classes/${classId}`
    return this.http.delete<any>(url);
  }
}