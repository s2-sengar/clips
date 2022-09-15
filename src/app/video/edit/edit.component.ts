import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IcLip } from 'src/app/model/model.clip';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit,OnDestroy,OnChanges {

  @Input() activeClip:IcLip|null=null;

  showAlert=false;
  alertColor='blue';
  alertMsg='Pleae Wait!';
  disable=false;
  constructor(
    private modal:ModalService
  ) { }

  id=new FormControl('');
  title=new FormControl('',[
    Validators.required,
    Validators.minLength(3)
  ])
  editTitle=new FormGroup({
    title:this.title,
    id:this.id
  });

  ngOnInit(): void {
    this.modal.register('editClip');
  }
  ngOnDestroy(): void {
      this.modal.deregister('editClip');
  }
  ngOnChanges(changes: SimpleChanges): void {
      this.id.setValue(this.activeClip?.['docId'] ?? '');
      this.title.setValue(this.activeClip?.title ?? '');

  }
  submit(){
    this.disable=true;
    this.showAlert=true;
    this.alertColor='blue';
    this.alertMsg="Please wait! We are working.."
    /***
     * 
     * Update this part
     */

  }


}
