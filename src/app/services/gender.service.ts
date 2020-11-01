import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {retry} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {GetdataService} from './getdata.service';
export interface Gender {
  Name: string;
  Id: string;
}

@Injectable({
  providedIn: 'root'
})
export class GenderService {

  constructor(private http: HttpClient , private generalDataService: GetdataService) { }
  get(): Observable<Gender[]> {
    return this.http.get<Gender[]>(this.generalDataService.baseAddress + 'Genders/Get').pipe(
      retry(1)
    );
  }
}
