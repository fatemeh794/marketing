import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {retry} from 'rxjs/operators';
import {GetdataService} from './getdata.service';
import {Page} from '../interfaces/interfaces';


@Injectable({
  providedIn: 'root'
})
export class PagesService {
  constructor(private http: HttpClient , private generalDataService: GetdataService) { }
  add(object: Page): any{
    const sendData = new FormData();
    sendData.append( 'Address', object.address);
    sendData.append( 'OurSiteId', object.siteid);
    console.log(sendData);
    this.http.post( this.generalDataService.baseAddress + 'OurPages/Add', sendData )
      .subscribe(res => {
        console.log(res);
      });
  }
  get(): Observable<Page[]> {
    return this.http.get<Page[]>(this.generalDataService.baseAddress + 'OurPages/Get').pipe(
      retry(1)
    );
  }
  update(object: Page): any{
    const Data = new FormData();
    Data.append( 'Address', object.address);
    Data.append( 'Id', object.id);
    this.http.put(this.generalDataService.baseAddress + 'OurPages/Update', Data)
      .subscribe(res => {
        console.log(res);
      }); }

  remove(id): any{
    this.http.delete(this.generalDataService.baseAddress + 'OurPages/Remove' + '/' + id)
      .subscribe(res => {
        console.log(res);
      }); }
}
