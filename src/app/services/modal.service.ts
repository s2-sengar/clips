import { Injectable } from '@angular/core';


interface IModal{
  id:string,
  visible:boolean
}


@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modals:IModal[]=[];
  constructor() { }
  register(id:string){
    this.modals.push(
      { id,visible:false }
    )
  }
  deregister(id:string){
    this.modals=this.modals.filter(el=>el.id != id);
  }
  isVisible(modalName:string){
    return Boolean(this.modals.find(el=>el.id===modalName)?.visible);
  }
  
  toggleModal(modalName:string){
    let modal:IModal|undefined=this.modals.find(el=>el.id==modalName);
    if(modal){
      modal.visible=!modal.visible;
    }
  }

}
