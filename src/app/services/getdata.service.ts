import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class GetdataService {
  constructor() { }
  baseAddress = 'https://torontomarketing.azurewebsites.net/api/';
}
