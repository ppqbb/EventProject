import { Component } from '@angular/core';
import firebase from 'firebase/compat/app';
import { getFirestore,collection,getDocs,query,where,deleteDoc } from 'firebase/firestore';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor() {
    this.userAthe();
  }

  public email:any="";
  public notifications:any=[];
  public refNote:any="";

  userAthe(){
    firebase.auth().onAuthStateChanged((user)=>{
      if (user) {
        this.email=user.email;
        this.getData(this.email)
      } else {
        console.error("Error getting urlImg:");
      }
    });
  }

  async getData(email:any){
    try {
      const ref = collection(getFirestore(),'Notifications');
      const q = query(ref, where('email','==',email));
      const gsnap = await getDocs(q);
      gsnap.forEach((doc) => {
        this.notifications.push(doc.data());
        this.refNote=doc.ref;
      });
      
      console.log(this.notifications)
    } catch (error) {
      console.error("Error getting urlImg:", error);
    }
  }


  deleteNoteAll(){
    deleteDoc(this.refNote);
  }
}
