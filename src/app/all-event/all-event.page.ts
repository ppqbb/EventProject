import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/compat/app';
import { getFirestore, collection, getDocs,query,where,doc, updateDoc,deleteDoc } from 'firebase/firestore';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-all-event',
  templateUrl: './all-event.page.html',
  styleUrls: ['./all-event.page.scss'],
})
export class AllEventPage implements OnInit {

  constructor(public alertController: AlertController) { }

  ngOnInit() {
    this.userAthe()
  }

  public events:any[]=[];
  public email:any="";
  public idEvent:any="";

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
      const ref = collection(getFirestore(), "Event");
      const q = query(ref, where("email", "==", email));
      const gsnap = await getDocs(q);
      gsnap.forEach((doc) => {
      this.events.push(doc.data());
      console.log(this.events);
      });
      } else {
        console.error('email is undefined or null');
      }
    } catch (error) {
      console.error("Error getting Event:", error);
    }
  }

  async getId(url?: string) {
    try {
      if (url !== undefined && url !== null) {
      const ref = collection(getFirestore(), "Event");
      const q = query(ref, where("img", "==", url));
      const gsnap = await getDocs(q);
      gsnap.forEach((doc) => {
      this.idEvent=doc.id;
      });
      console.log(this.idEvent);
      const alert = await this.alertController.create({
        header: "Are you suer?",
        buttons: [
          {
            text: 'No',
            cssClass: 'alert-button-cancel',
          },
          {
            text: 'Yas',
            cssClass: 'alert-button-cancel',
            handler: () => {
              this.deleteEvent(this.idEvent);
            }
          }
        ]
      });
  
      await alert.present();
      } else {
        console.error('URL is undefined or null');
      }
    } catch (error) {
      console.error("Error getting urlImg:", error);
    }
  }

  async deleteEvent(id:any){
    try {
      id.toString();
      await deleteDoc(doc(getFirestore(), "Event", id));
    } catch (error) {
      console.error("Error delete Event:", error);
    }
  }

}
