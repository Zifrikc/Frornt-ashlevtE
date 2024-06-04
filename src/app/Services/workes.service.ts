import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import urlbase from './helper';

@Injectable({
  providedIn: 'root'
})
export class WorkesService {
  constructor(private http: HttpClient) { }

  public getAllWorkes() {
    return this.http.get(`${urlbase}/Workers/`);
  }

  public addNewWorke(workes: any) {
    return this.http.post(`${urlbase}/Workers/`, workes);
  }
  public createWorker(worker: Worker): Observable<Worker> {
    return this.http.post<Worker>(`${urlbase}/Workers/`, worker);
  }

  public updateWorke(workes: any) {
    return this.http.put(`${urlbase}/Workers/`, workes);
  }

  public getWorkeById(id: any) {
    return this.http.get(`${urlbase}/Workers/${id}`);
  }

  public deleteWorkeyId(id: any) {
    return this.http.delete(`${urlbase}/Workers/delete/${id}`);
  }
}