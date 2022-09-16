import { Injectable } from '@angular/core';
import { fakeAsync } from '@angular/core/testing';
import { FirebaseApp } from '@angular/fire/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { AngularFirestore,AngularFirestoreCollection, DocumentReference, QuerySnapshot} from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { map, of, switchMap,BehaviorSubject,combineLatest } from 'rxjs';
import { IcLip } from '../model/model.clip';

@Injectable({
  providedIn: 'root'
})
export class ClipService {

  public clipsCollection:AngularFirestoreCollection<IcLip>

  clipsList:IcLip[]=[];
  pendingRequest=false;

  constructor(
    private db:AngularFirestore,
    private auth:AngularFireAuth,
    private storage:AngularFireStorage
  ){
    this.clipsCollection=db.collection('clips')
  }

  createClip(data:IcLip):Promise<DocumentReference<IcLip>>{
    return this.clipsCollection.add(data)
  }

  getUserClips(sort$:BehaviorSubject<string>){
    return combineLatest([
        this.auth.user,
        sort$
      ]).pipe(
        switchMap((values)=>{
          const user=values[0];
          const sort=values[1];
          if(!user) return of([])
          const query=this.clipsCollection.ref.where(
            'uid','==',user?.['uid']
          ).orderBy(
            'timestamp',
            sort ==='1' ?'desc' :'asc'
          );
          return query.get()
        }),
        map(snapshot=>(snapshot as QuerySnapshot<IcLip>).docs)
      )
  }

  async deleteClip(clip:IcLip){
    const clipRef=this.storage.ref(`clips/${clip.fileName}`);
    await clipRef.delete();
    await this.clipsCollection.doc(clip.docId).delete();
  }

 getclip=async()=>{
  if(this.pendingRequest){
    return;
  }
  this.pendingRequest=true;
  let query=this.clipsCollection.ref.orderBy('timestamp','asc').limit(6);
  const {length}=this.clipsList;
  if(length){
    const lastDocId=this.clipsList[length-1].docId;
    const lastDocSnap=await this.clipsCollection.doc(lastDocId)
                            .get()
                            .toPromise();
    query=query.startAfter(lastDocSnap);
  }
  const snapshot=await query.get();
  
  snapshot.forEach((doc)=>{
    this.clipsList.push({
      docId:doc.id,
      ...doc.data()
    })
  })

  this.pendingRequest=false;
 }

}
