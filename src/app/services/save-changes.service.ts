import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SaveChangesService {
  private Array: any [];


  constructor() {
  }

  store(userarray1 , userarray2 ): any  {

    localStorage.setItem( 'mytodoarray' , JSON.stringify(userarray1));
    localStorage.setItem( 'mydonearray' , JSON.stringify(userarray2));

      }

 //  recieve(): any {
   // localStorage.getItem( 'myarray');
 // }


}
