import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-clip',
  templateUrl: './clip.component.html',
  styleUrls: ['./clip.component.scss']
})
export class ClipComponent implements OnInit {

  id='';

  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
    /**\
     * Fetching ID from route
     */
    this.route.params.subscribe((param:Params)=>{
      this.id=param?.['id'];
    })
  }

}
