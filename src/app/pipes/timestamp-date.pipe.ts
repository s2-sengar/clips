import { Pipe, PipeTransform } from '@angular/core';
import { Timestamp } from 'rxjs';
import firebase from 'firebase/compat/app';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'timestampDate'
})
export class TimestampDatePipe implements PipeTransform {

  constructor(
    private datePipe:DatePipe
  ){

  }

  transform(value:unknown){
    const date=(value as firebase.firestore.Timestamp).toDate();
    return this.datePipe.transform(date,'mediumDate');
  }

}
