import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private URL = "http://localhost:3000";

  constructor(private HTTP: HttpClient) { }

  getReportById(): Observable<any> {
    return this.HTTP.post(this.URL+"/getById", {"id": 930744963443176200});
  }

  addReport(): Observable<any> {
    return this.HTTP.post(this.URL+"/newReport", 
    {
      "base": 1000,
      "percentuale": 2,
      "anni": 3
    });
  }
}
