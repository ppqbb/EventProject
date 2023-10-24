import { getFirestore, addDoc, collection, getDoc, doc, setDoc ,getDocs,query,where} from 'firebase/firestore';
import { InfoEvent } from '../info-event';
import firebase from 'firebase/compat/app';
import { Authentication } from '../authentication/authentication';
import { PhotoService } from '../services/photo.service';
import { NgModule } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

@NgModule({
  declarations: []
})

export class SendMessages {

  constructor(public auth:Authentication ,public photo:PhotoService,private navCtrl: NavController,) {
    this.loadIndexFromFirestore();
    this.getEventIds();
  }

  public TextDB: any;
  public eventId: string | null = null;
  public index: number = 0;
  public eventIds: string[] = [];
  public email:any;
  public img:any;
  public details:any=[];
  public timeEvent:string='';

  public lat=Number(sessionStorage.getItem("lat"));
  public lng=Number(sessionStorage.getItem("lng"));



  async loadIndexFromFirestore() {
    try {
      const db = getFirestore();
      const docRef = doc(db, 'Index', 'eventIndex');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        this.index = docSnap.data()?.['value'] || 0;
      }
    } catch (e) {
      console.error('Error loading index from Firestore: ', e);
    }
  }

  messageTime() {
    var currentTime = new Date();
    var hour = currentTime.getHours();
    var minute = currentTime.getMinutes();
    var time = hour + ":" + minute;
    return time;
  }

  async sendEventDB() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.email= user.email;
        this.img=this.photo.url;
        console.log(this.lat)
        console.log(this.lng)
        this.timeEvent=this.messageTime();

        this.infoEvent();
        this.index++;
        this.storeIndexInFirestore();
      }
      else{
        alert('eroor');
      }
    });
  }
  
  infoEvent(){
    let infoEvent:InfoEvent={
      email:this.email,
      text:this.TextDB,
      img:this.img,
      index:this.index,
      time:this.timeEvent,
      lat:Number(this.lat),
      lng:Number(this.lng)
    }
    this.sendInfoEvent(infoEvent);
  }

  sendInfoEvent(infoEvent: InfoEvent) {
    if (infoEvent.img !== undefined && infoEvent.img !== null && this.TextDB.trim() !== "") {
      const ref = collection(getFirestore(), 'Event');
      addDoc(ref, infoEvent)
        .then((docRef) => {
          this.eventId = docRef.id;
          console.log('Document written with ID: ', this.eventId);
          this.navCtrl.navigateForward(['tabs'])
        })
        .catch((error) => {
          console.error('Error adding document: ', error);
        });
    } else {
      alert('img field is null. must be add image');
    }
  }

  

  async storeIndexInFirestore() {
    try {
      const db = getFirestore();
      const docRef = doc(db, 'Index', 'eventIndex');
      await setDoc(docRef, { value: this.index });
    } catch (e) {
      console.error('Error storing index in Firestore: ', e);
    }
  }

  async getEventIds() {
    const db = getFirestore();
    const eventsCollection = collection(db, "Event");
    try {
      const querySnapshot = await getDocs(eventsCollection);
      querySnapshot.forEach((doc) => {
        this.eventIds.push(doc.id);
      });
      console.log("Event IDs:", this.eventIds);
    } catch (error) {
      console.error("Error getting event IDs:", error);
    }
  }
}
