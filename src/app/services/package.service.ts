import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {retry} from 'rxjs/operators';
import {Package} from '../interfaces/interfaces';
import {GetdataService} from './getdata.service';


@Injectable({
  providedIn: 'root'
})
export class PackageService {
  constructor(private http: HttpClient , private generalDataService: GetdataService) { }
  add(object: Package): any{
    const sendData = new FormData();
    sendData.append( 'name', object.name);
    console.log(sendData);
    this.http.post( this.generalDataService.baseAddress + 'Packages/Add', sendData )
      .subscribe(res => {
        console.log(res);
      });
  }
  get(): Observable<Package[]> {
    return this.http.get<Package[]>(this.generalDataService.baseAddress + 'Packages/Get').pipe(
      retry(1)
    );
  }
  update(object: Package): any{
    const Data = new FormData();
    Data.append( 'Name', object.name);
    Data.append( 'Id', object.id);
    this.http.put(this.generalDataService.baseAddress + 'Packages/Update', Data)
      .subscribe(res => {
        console.log(res);
      }); }

  remove(id): any{
    this.http.delete(this.generalDataService.baseAddress + 'Packages/Remove' + '/' + id)
      .subscribe(res => {
        console.log(res);
      }); }
}
