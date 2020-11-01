import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {retry} from 'rxjs/operators';
import {TagData} from '../interfaces/interfaces';
import {GetdataService} from './getdata.service';


@Injectable({
  providedIn: 'root'
})
export class TagsService {

  constructor(private http: HttpClient , private generalDataService: GetdataService) { }
  addtags(object: TagData): any{
    const sendData = new FormData();
    sendData.append( 'Name', object.name);
    console.log(sendData);
    this.http.post( this.generalDataService.baseAddress + 'Tags/Add', sendData )
      .subscribe(res => {
        console.log(res);
      });
  }
  gettags(): Observable<TagData[]> {
    return this.http.get<TagData[]>(this.generalDataService.baseAddress + 'Tags/Get').pipe(
      retry(1)
    );
  }
  updatetags(object: TagData): any{
    const Data = new FormData();
    Data.append( 'Name', object.name);
    Data.append( 'Id', object.id);
    this.http.put(this.generalDataService.baseAddress + 'Tags/Update', Data)
        .subscribe(res => {
          console.log(res);
        }); }

  removetag(id): any{
      this.http.delete(this.generalDataService.baseAddress + 'Tags/Remove' + '/' + id)
        .subscribe(res => {
          console.log(res);
        });
  }
  }

