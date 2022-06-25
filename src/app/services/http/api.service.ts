import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiUrl;
  private version = environment.version;

  private httpOptions = {
    headers: new HttpHeaders({
        'Content-Type':  'application/json; charset=utf-8'
    })
  };

  constructor(
    private http: HttpClient
  ) { }

  getNotifications() {
    return this.http.get<any>(`${this.baseUrl}${this.version}/get_notification`, this.httpOptions);
  }
}