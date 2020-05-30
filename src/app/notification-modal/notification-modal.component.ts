import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-notification-modal',
  templateUrl: './notification-modal.component.html',
  styleUrls: ['./notification-modal.component.css']
})
export class NotificationModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NotificationModalComponent>,
              @Inject(MAT_DIALOG_DATA) public message: string) { }

  ngOnInit(): void {
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}
