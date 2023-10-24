import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/compat/app';
import { getFirestore, collection, getDocs,query,where,doc,getDoc,updateDoc,deleteDoc } from 'firebase/firestore';

@Component({
  selector: 'app-all-event-boost',
  templateUrl: './all-event-boost.page.html',
  styleUrls: ['./all-event-boost.page.scss'],
})
export class AllEventBoostPage implements OnInit {

  constructor() { }

  public email:any="";
  public eventId:any="";
  public events:any=[];

  ngOnInit() {
    this.userAthe()
  }
  

  userAthe(){
    firebase.auth().onAuthStateChanged((user)=>{
      if (user) {
        this.email=user.email;
        this.getIdEvent(this.email)
      } else {
        console.error("Error getting urlImg:");
      }
    });
  }
  async getIdEvent(email: any) {
    try {
      if (email !== undefined && email !== null) {
      const ref = collection(getFirestore(), "Boost");
      const q = query(ref, where("email", "==", email));
      const gsnap = await getDocs(q);
      gsnap.forEach((doc) => {
        this.eventId=doc.data();
        this.getEvent(this.eventId.eventId)
      });
      console.log(this.eventId);
      } else {
        console.error('email is undefined or null');
      }
    } catch (error) {
      console.error("Error getting Event:", error);
    }
  }

  async getEvent(id:string) {
    try {
      console.log(id);
      const db = getFirestore();
      if(id !== null){
        const docRef = doc(db, "Event", id);
        const docSnap = await getDoc(docRef);
        console.log(id)
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        this.events.push(docSnap.data());
        console.log(this.events);
      } else {
        console.log("Document does not exist.");
      }
      }
    } catch (error) {
      console.error("Error getting document:", error);
    }
  }
  



}
