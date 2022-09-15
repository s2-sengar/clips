import firebase from "firebase/compat/app";

export interface IcLip{
    uid:string;
    displayName:string;
    title:string;
    fileName:string;
    url:string;
    timestamp:firebase.firestore.FieldValue;
    docId?:string;
}