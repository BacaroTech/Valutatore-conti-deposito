import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Filter from '../model/filter';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private URL = "http://localhost:3000";

  constructor(private HTTP: HttpClient) { }

  getReportById(id: number): Observable<any> {
    return this.HTTP.post(this.URL+"/getById", {"id": id});
  }

  addReport(filter:Filter): Observable<any> {
    return this.HTTP.post(this.URL+"/newReport", filter);
  }
}
