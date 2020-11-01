import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpEventType} from '@angular/common/http';
import {Observable} from 'rxjs';
import {retry} from 'rxjs/operators';
import {User} from '../interfaces/interfaces';
import {GetdataService} from './getdata.service';


@Injectable({
  providedIn: 'root'
})
export class AdduserService {
  public progress: number;
  public message: string;
  public UploadFinished = new EventEmitter();

  constructor(private http: HttpClient , private generalDataService: GetdataService ) { }
  public uploadFile = (data: User) => {
    const formdata = new FormData();
    formdata.append( 'FirstName' , data.FirstName);
    formdata.append( 'LastName' , data.LastName);
    formdata.append( 'Password' , data.Password);
    formdata.append('GenderId', data.GenderId);
    formdata.append('Picture', data.ProfileImage);
    this.http.post( this.generalDataService.baseAddress + 'Users/Register', formdata , {reportProgress: true, observe: 'events'} )
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.UploadFinished.emit(event.body);
        }
        console.log(event);
      });
  }

  get(): Observable<User[]> {
    return this.http.get<User[]>(this.generalDataService.baseAddress + 'Users/Get').pipe(
      retry(1)
    );
  }
  update(data): any {
    const formdata = new FormData();
    formdata.append( 'FirstName' , data.firstName);
    formdata.append( 'LastName' , data.lastName);
    formdata.append( 'Id' , data.Id);
    formdata.append('GenderId', data.genderId);
    formdata.append('Picture', data.profileImage);
    this.http.put( this.generalDataService.baseAddress + 'Users/Update', formdata , {reportProgress: true, observe: 'events'} )
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
    this.http.delete(this.generalDataService.baseAddress + 'Users/Remove' + '/' + id)
      .subscribe(res => {
        console.log(res);
      }); }
}
