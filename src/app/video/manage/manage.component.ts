import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  videoOrder='1'

  constructor(
    private router:Router,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    /**
     * We can subscribe to this observable for changes on the route.
     */
    this.route.queryParamMap.subscribe((params:Params)=>{
      this.videoOrder=params['params']['sort']==='2' ? params['params']['sort'] : '1';
    })
  }

  sort(event:Event){
    // Query Parameter
    const {value} = (event.target as HTMLSelectElement)
    
    this.router.navigateByUrl(`/manage?sort=${value}`)    

  }

}
