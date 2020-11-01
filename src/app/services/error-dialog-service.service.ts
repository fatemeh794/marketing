import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ErrorDialogCompnent} from '../components/errordialog/errordialog.component';

@Injectable()
export class ErrorDialogService {
  public isDialogOpen = false;

  constructor(public dialog: MatDialog) {
  }

  openDialog(data): any {
    if (this.isDialogOpen) {
      return false;
    }
    this.isDialogOpen = true;
    const dialogRef = this.dialog.open(ErrorDialogCompnent, {
      width: '300px',
      data
    });

    dialogRef.afterClosed().subscribe(result => {
      this.isDialogOpen = false;
      let animal;
      animal = result;
    });
  }
}
