import { Component } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { SendMessages } from '../sendMesseges/send-messages';
import { Router } from '@angular/router';
import { getFirestore, collection, getDocs,query,where,increment,updateDoc,doc } from 'firebase/firestore';
import { NavController } from '@ionic/angular';
import { Authentication } from '../authentication/authentication';
import firebase from 'firebase/compat/app';
import { BoostInfo } from '../boost-info';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  constructor(
    public photoService: PhotoService,
    public infoEventFromDB: SendMessages,
    public rout :Router,
    private NavCont: NavController,
    public Auth:Authentication,
    public alertController: AlertController
  ) {
    
  }

  ngOnInit() {
    this.getAllEvents();
  }

  index = this.infoEventFromDB.index;
  eventID = this.infoEventFromDB.eventId;
  Text: any;
  events: any[] = [];
  details:any = [];
  indexDetails:number=0;
  nav='';
  public email:any="";
  public numberBoost:number=0;
  public eventIDForBoost:string="";

  EventId="";
  

  getEventIds() {
    this.infoEventFromDB.eventIds;
  }

  getEventIndex() {
    return this.infoEventFromDB.index;
  }

  async getideven(url: string) {
    try {
      if (url !== undefined && url !== null) {
      const ref = collection(getFirestore(), "Event");
      const q = query(ref, where("img", "==", url));
      const gsnap = await getDocs(q);
      gsnap.forEach((doc) => {
      sessionStorage.setItem('idEvent',doc.id);
      });
      console.log('Ok');
      this.goToDetailsPage()
      } else {
        console.error('URL is undefined or null');
      }
    } catch (error) {
      console.error("Error getting urlImg:", error);
    }
  }

  async getIdEvent(url: string) {
    try {
      if (url !== undefined && url !== null) {
      const ref = collection(getFirestore(), "Event");
      const q = query(ref, where("img", "==", url));
      const gsnap = await getDocs(q);
      gsnap.forEach((doc) => {
      this.eventIDForBoost=doc.id;
      });
      this.boostEvent(this.eventIDForBoost);
      console.log('Ok');
     
      } else {
        console.error('URL is undefined or null');
      }
    } catch (error) {
      console.error("Error getting urlImg:", error);
    }
  }

  boostEvent(idEvent:string)
  {
    firebase.auth().onAuthStateChanged((user)=>{
      if (user) {
        this.email=user.email
        this.eventIDForBoost=idEvent;
        this.infoUsers();
      } else {
        console.error("Error getting urlImg:");
      }
    });
  }

  infoUsers(){
    let BoostInfoObject: BoostInfo = {
        email: this.email,
        eventId:this.eventIDForBoost,
    };
    this.Auth.sendBoost(BoostInfoObject);
    }

  goToDetailsPage()
  {
    this.NavCont.navigateForward("tabs/tabs/tab2/event-details");
  }

  async getAllEvents() {
    const db = getFirestore();
    const eventsCollection = collection(db, "Event");
    try {
      const querySnapshot = await getDocs(eventsCollection);
      querySnapshot.forEach((doc) => {
        const event = doc.data();
        this.events.push(event); 
      });
      console.log("All Events:", this.events);
    } catch (error) {
      console.error("Error getting events:", error);
    }
  }

  detailEvent(Event:any)
  {
    this.details=Event;
  }

  CarentBoost(Boost:number){
    firebase.auth().onAuthStateChanged(async (user)=>{
      if (user) {
        const emailUser=user.email;
        if(emailUser!==null){
          this.setBoost(emailUser,Boost)
        }
      } else {
        return console.error("Error getting urlImg:");
      }
    });
  }

  loadData(event:any) {
    setTimeout(() => {
      // Reload the page
      window.location.reload();
      event.target.complete();
    }, 1000);
  }
  async setBoost(email:string,boost:number){ 
    const db = getFirestore();
    const collectionRef = collection(db, 'Users');
    const queryyy = query(collectionRef, where('email', '==', email));
    try {
      const querySnapshot = await getDocs(queryyy);
      querySnapshot.forEach(async (docSnap) => {
        const userDoc = doc(db, 'Users', docSnap.id);
        const fieldToUpdate = 'boost';
        const data:any =docSnap.data();
        const currentBoostValue = data.boost; 
        const boostIncrement = increment(boost);
        if (currentBoostValue + boost < 0) {
          console.log('< 0');
          this.NavCont.navigateForward(["boost-page"]);
         alert("You must purchase a boost from the settings page");
        } else {
          await updateDoc(userDoc, { [fieldToUpdate]: boostIncrement });
          console.log('update successfully');
        }
      });
    } catch (error) {
      console.error('Error querying for documents: ', error);
    }
  }
}


