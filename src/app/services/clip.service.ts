import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { AngularFirestore,AngularFirestoreCollection, DocumentReference, QuerySnapshot} from '@angular/fire/compat/firestore';
import { map, of, switchMap } from 'rxjs';

import { IcLip } from '../model/model.clip';

@Injectable({
  providedIn: 'root'
})
export class ClipService {

  public clipsCollection:AngularFirestoreCollection<IcLip>

  constructor(
    private db:AngularFirestore,
    private auth:AngularFireAuth
  ){
    this.clipsCollection=db.collection('clips')
  }

  createClip(data:IcLip):Promise<DocumentReference<IcLip>>{
    return this.clipsCollection.add(data)
  }

  getUserClips(){
    return this.auth.user.pipe(
        switchMap((user)=>{
          if(!user) return of([])
          const query=this.clipsCollection.ref.where(
            'uid','==',user?.['uid']
          );
          return query.get()
        }),
        map(snapshot=>(snapshot as QuerySnapshot<IcLip>).docs)
      )
  }
}
