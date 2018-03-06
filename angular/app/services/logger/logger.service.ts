import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class LoggerService {

  constructor(
    public snackBar: MatSnackBar
  ) { }

  error(message: any) {
    this.snackBar.open(message, null, {
      duration: 3000,
      horizontalPosition: 'right',
      panelClass: 'snackbar-error'
    });
    console.error(message);
  }

  log(message: any) {
    this.snackBar.open(message, null, {
      duration: 3000,
      horizontalPosition: 'right'
    });
  }

  success(message: any) {
    this.snackBar.open(message, null, {
      duration: 3000,
      horizontalPosition: 'right',
      panelClass: 'snackbar-success'
    });
  }

}
