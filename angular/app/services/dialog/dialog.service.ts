import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ConfirmDialogComponent } from '@components/confirm-dialog/confirm-dialog.component';
import { Observable, of } from 'rxjs';

@Injectable()
export class DialogService {

  constructor(
    private dialog: MatDialog
  ) { }

  confirm(title: string, message: string): Observable<boolean> {
    let dialogRef: MatDialogRef<ConfirmDialogComponent>;
    dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message;
    return dialogRef.afterClosed();
  }

}
