import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit  } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-action',
  templateUrl: './confirm-action.component.html',
  styleUrl: './confirm-action.component.css'
})
export class ConfirmActionComponent implements OnInit  {
inputParams: any;

constructor( @Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: DialogRef){
}

proceed(): any{
  this.inputParams.parentForm.okToDelete = true;
  this.dialogRef.close(true);
}

ngOnInit(): void {
  this.inputParams = this.data;
}

  cancelDialog(): void{
    this.dialogRef.close(false);
  }
}
