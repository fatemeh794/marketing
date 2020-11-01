import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {retry} from 'rxjs/operators';
import {GetdataService} from './getdata.service';
import {Site} from '../interfaces/interfaces';



@Injectable({
  providedIn: 'root'
})
export class SitesService {
  constructor(private http: HttpClient , private generalDataService: GetdataService) { }
  add( object: Site): any{
    this.http.post( this.generalDataService.baseAddress + 'OurSites/AddSiteTag', object )
      .subscribe(res => {
        console.log(res);
      });
  }
  get(): Observable<Site[]> {
    return this.http.get<Site[]>(this.generalDataService.baseAddress + 'OurSites/Get').pipe(
      retry(1)
    );
  }
  update(object: Site): any{
    debugger;
    this.http.post(this.generalDataService.baseAddress + 'OurSites/UpdateSiteTag', object)
      .subscribe(res => {
        console.log(res);
      }); }

  remove(id): any{
    this.http.delete(this.generalDataService.baseAddress + 'OurSites/Remove' + '/' + id)
      .subscribe(res => {
        console.log(res);
      }); }
}

