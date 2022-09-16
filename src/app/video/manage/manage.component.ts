import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute, Params } from '@angular/router';
import { IcLip } from 'src/app/model/model.clip';
import { ClipService } from 'src/app/services/clip.service';
import { ModalService } from 'src/app/services/modal.service';

import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  videoOrder='1';
  clips:IcLip[]=[];

  activeClip:IcLip |null=null;

  sort$:BehaviorSubject<string>;

  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private clipService:ClipService,
    private modal:ModalService
  ) { 
    this.sort$=new BehaviorSubject(this.videoOrder);
  }

  ngOnInit(): void {
    /**
     * We can subscribe to this observable for changes on the route.
     */
    this.route.queryParamMap.subscribe((params:Params)=>{
      this.videoOrder=params['params']['sort']==='2' ? params['params']['sort'] : '1';
      this.sort$.next(this.videoOrder);
    });

    /**
     * Storing Clips Locally
     */
    this.clipService.getUserClips(this.sort$).subscribe(
      {
        next:(docs)=>{
          this.clips=[];
          docs.forEach((doc)=>{
            this.clips.push({
              docId:doc.id,
              ...doc.data()
            })
          })
        }
      }
    );

  }

  sort(event:Event){
    // Query Parameter
    const {value} = (event.target as HTMLSelectElement)
    this.router.navigateByUrl(`/manage?sort=${value}`)    

  }
  editClip($event:Event, clip:IcLip){
    $event.preventDefault();
    this.activeClip=clip;
    this.modal.toggleModal('editClip');
  }

  deleteClip($event:Event, clip:IcLip){
    $event.preventDefault();
    this.clipService.deleteClip(clip);
    this.clips.forEach((el,id)=>{
      if(el.docId==clip.docId){
        this.clips.splice(id,1);
      }
    })
  }

}
