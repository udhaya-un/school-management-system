import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private httpService: HttpClient) { }
  getStudentDetails(): Observable<any> {
    return this.httpService.get('../../assets/students.json');
  }
}
