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
    let bg=`bg-${this.color}`;
      console.log(bg);
    return bg;
  }

}
