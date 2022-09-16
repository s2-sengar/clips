import { Component, OnDestroy, OnInit } from '@angular/core';
import { Timestamp } from 'rxjs';
import { ClipService } from '../services/clip.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-clips-list',
  templateUrl: './clips-list.component.html',
  styleUrls: ['./clips-list.component.scss'],
  providers:[DatePipe]
})
export class ClipsListComponent implements OnInit,OnDestroy {

  constructor(
    public clipService:ClipService
  ) { }

  ngOnInit(): void {
    window.addEventListener('scroll',this.handleScore);
  }

  ngOnDestroy():void{
    window.removeEventListener('scroll',()=>{});
  }

  handleScore=async ()=>{
    const {scrollTop,offsetHeight}=document.documentElement;
    const {innerHeight}=window;
    const bootomOfPage=Math.round(scrollTop)+innerHeight===offsetHeight;
    if(bootomOfPage){
      await this.clipService.getclip();
    }

  }
  convertToDate(timestamp:Timestamp<number>){
    const date=new Date(timestamp.timestamp).toLocaleDateString('en-us');
    return date;
  }

}
