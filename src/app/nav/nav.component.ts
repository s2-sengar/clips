import { Component, OnInit } from '@angular/core';
import { ModalService } from '../services/modal.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  modalName:string='auth';
  constructor(public modal:ModalService) { }

  ngOnInit(): void {
  }

  openAuthModal($event:Event){
    $event.preventDefault();
    this.modal.toggleModal(this.modalName);
  }
}
