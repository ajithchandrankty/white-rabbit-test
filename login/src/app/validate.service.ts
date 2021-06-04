import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {
  public emitSearchDetails = new EventEmitter;
  constructor(private http: HttpClient) { }

  public getNewUsersData(): Observable<any> {
    return this.http.get("./assets/data.json");
  }

  public getUsersData(): Observable<any>{
    return this.http.get('https://randomuser.me/api/0.8/?results=20')
  } 

  public searchDetails(data: string){
    this.emitSearchDetails.emit(data)
  }
}
