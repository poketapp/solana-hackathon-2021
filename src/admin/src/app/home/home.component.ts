import { Component, OnInit, Inject } from '@angular/core';

import { HomeService } from './home.service';
import { NotificationService } from './../notification.service';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


export interface DialogData {
  name: string;
  lat: string;
  lng: string;
  desc: string;
  points: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  markers = [];
  errorMsg = null;

  name: string;
  lat: string;
  lng: string;
  desc: string;
  points: number;

  constructor(
    public dialog: MatDialog,
    private homeServce: HomeService,
  ) {
  }

  ngOnInit(): void {
    this.homeServce.taskCreated.subscribe((data) => {
      console.log('TASK IS');
      console.log(data);
      this.markers.push({ latitude: data.lat, longitude: data.lng });
    });
  }

  isEmptyObject(obj): boolean {
    return obj && Object.keys(obj).length === 0;
  }

  openTaskDialog(): void {
    const dialogRef = this.dialog.open(CreateTaskDialog, {
      width: '500px',
      data: { name: this.name, lat: this.lat, lng: this.lng, desc: this.desc, points: this.points }
    });
  }
}

@Component({
  selector: 'create-task-dialog',
  templateUrl: 'create-task-dialog.html',
})
export class CreateTaskDialog {

  constructor(
    public dialogRef: MatDialogRef<HomeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private notifyService: NotificationService,
    private homeService: HomeService,
  ) { }

  createTask(data): void {
    this.homeService.createTask(data.name, data.lat, data.lng, data.desc, data.points).finally(() => {
      this.showToasterSuccess('Successfully Created Task', '');
    })

  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  showToasterSuccess(title: string, body: string): void {
    this.notifyService.showSuccess(title, body);
  }

  showToasterError(title: string, body: string): void {
    this.notifyService.showError(title, body);
  }

  showToasterInfo(title: string, body: string): void {
    this.notifyService.showInfo(title, body);
  }

  showToasterWarning(title: string, body: string): void {
    this.notifyService.showWarning(title, body);
  }
}
