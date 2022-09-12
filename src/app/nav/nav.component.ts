import { Component, OnInit } from '@angular/core';
import { ModalService } from '../services/modal.service';

import { AuthService } from '../services/auth.service';

import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  modalName:string='auth';
  constructor(
    public modal:ModalService,
    public auth:AuthService,
    private afAuth:AngularFireAuth
    ) { }

  ngOnInit(): void {
  }

  openAuthModal($event:Event){
    $event.preventDefault();
    this.modal.toggleModal(this.modalName);
  }

}
