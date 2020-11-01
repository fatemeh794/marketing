import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GetdataService} from './getdata.service';
import {Observable} from 'rxjs';
import { Panel} from '../interfaces/interfaces';
import {retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaneladvertisementService {
  constructor(private http: HttpClient , private generalDataService: GetdataService) { }
  add(object): any{
    const Data = new FormData();
    Data.append( 'OurPageId', object.OurPageId);
    Data.append( 'Description', object.Description);
    this.http.post( this.generalDataService.baseAddress + 'Panels/Add', Data )
      .subscribe(res => {
        console.log(res);
      });
  }
  get(): Observable<Panel[]> {
    return this.http.get<Panel[]>(this.generalDataService.baseAddress + 'Panels/Get').pipe(
      retry(1)
    );
  }
  update(object): any{
    debugger;
    const Data = new FormData();
    Data.append( 'OurPageId', object.ourPageId);
    Data.append( 'Id', object.id);
    Data.append( 'Description', object.description);
    this.http.put(this.generalDataService.baseAddress + 'Panels/Update', Data)
      .subscribe(res => {
        console.log(res);
      }); }

  remove(id): any{
    this.http.delete(this.generalDataService.baseAddress + 'Panels/Remove' + '/' + id)
      .subscribe(res => {
        console.log(res);
      }); }
}
