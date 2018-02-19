import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.css']
})
export class SnackBarComponent implements OnInit {

  message: string;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
  }

  ngOnInit() {
    this.message = this.data.snackBarMessage;
  }

}
