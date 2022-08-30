import { Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-aleart',
  templateUrl: './aleart.component.html',
  styleUrls: ['./aleart.component.scss']
})
export class AleartComponent implements OnInit {
  @Input() color='blue';
  constructor(){

  }

  ngOnInit(): void {
      
  }

  get bgColor(){
    console.log(`bg-${this.color}-400`)
    return `bg-${this.color}-500`;
  }

}
