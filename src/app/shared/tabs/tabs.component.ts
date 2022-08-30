import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {

  @Input() tabID:string='';
  @Input() active:boolean=false;
  constructor() { }

  ngOnInit(): void {
    
  }

}
