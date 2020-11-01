import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './errordialog.component.html'
})
export class ErrorDialogCompnent {

  title = 'Angular-Interceptor';

  constructor(@Inject(MAT_DIALOG_DATA) public data: string) {
  }
}
