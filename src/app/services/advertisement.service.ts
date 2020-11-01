import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpEventType} from '@angular/common/http';
import {GetdataService} from './getdata.service';
import {Advertisement, Package, User} from '../interfaces/interfaces';
import {Observable} from 'rxjs';
import {retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdvertisementService {
  public progress: number;
  public message: string;
  public UploadFinished = new EventEmitter();

  constructor(private http: HttpClient, private generalDataService: GetdataService) {
  }

  public uploadFile = (data: Advertisement) => {
    const formdata = new FormData();
    formdata.append('FileName', data.fileName);
    formdata.append('Link', data.link);
    formdata.append('PanelId', data.PanelId);
    formdata.append('Picture', data.picture);
    this.http.post(this.generalDataService.baseAddress + 'Advertisements/Add', formdata, {reportProgress: true, observe: 'events'})
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.UploadFinished.emit(event.body);
        }
      });
  }
  get(): Observable<Advertisement[]> {
    return this.http.get<Advertisement[]>(this.generalDataService.baseAddress + 'Advertisements/Get').pipe(
      retry(1)
    );
  }
  update(data): any{
    debugger;
    const formdata = new FormData();
    formdata.append('FileName', data.fileName);
    formdata.append('Link', data.link);
    formdata.append('Id', data.id);
    formdata.append('Picture', data.picture);
    formdata.append('PanelId', data.panelId);
    this.http.put(this.generalDataService.baseAddress + 'Advertisements/Update', formdata, {reportProgress: true, observe: 'events'})
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.UploadFinished.emit(event.body);
        }
      });
  }

  remove(id): any{
    this.http.delete(this.generalDataService.baseAddress + 'Advertisements/Remove' + '/' + id)
      .subscribe(res => {
        console.log(res);
      }); }
}


