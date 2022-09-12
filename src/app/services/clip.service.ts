import { Injectable } from '@angular/core';

import { AngularFirestore,AngularFirestoreCollection} from '@angular/fire/compat/firestore';

import { IcLip } from '../model/model.clip';

@Injectable({
  providedIn: 'root'
})
export class ClipService {
  public clipsCollection:AngularFirestoreCollection<IcLip>

  constructor(
    private db:AngularFirestore
  ){
    this.clipsCollection=db.collection('clips')
  }

  async createClip(data:IcLip){
    await this.clipsCollection.add(data)
  }
}
