import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { SendMessages} from '../sendMesseges/send-messages'
import { NavController } from '@ionic/angular';
import { Tab2Page } from '../tab2/tab2.page';
import { getFirestore, addDoc, collection, getDocs,query,where,doc,getDoc } from 'firebase/firestore';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
declare var google: any;

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.page.html',
  styleUrls: ['./event-details.page.scss'],
})


export class EventDetailsPage implements OnInit {
    constructor(public photoService: PhotoService ,public infoEventFromDB:SendMessages,public NavCo:NavController,public tab2:Tab2Page,public location:Location,public rout:Router) { 
      this.getEvent();
    }
    ngOnInit() {
    }

    eventID = this.infoEventFromDB.eventId;
    event:any;
    public id="";
    
    // Inside your component class
    async getEvent() {
      try {
        const thid =sessionStorage.getItem("idEvent") 
        console.log(thid);
        const db = getFirestore();
        if(thid !== null){
          const docRef = doc(db, "Event", thid);
          const docSnap = await getDoc(docRef);
        console.log(thid)
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          this.event = docSnap.data();
          console.log(this.event);
        } else {
          console.log("Document does not exist.");
        }
        }
      } catch (error) {
        console.error("Error getting document:", error);
      }
    }

    navigateToLocation() {
      const lat= this.event.lat;
      console.log(lat);
      const lng= this.event.lng;
      console.log(lng);
      
      const url = `https://www.google.com/maps?q=${lat},${lng}`;
      window.open(url, '_system');
    }

    
    
    
    messages: string[] = [];
    newMessage: string = '';
    sendMessage() {
    if (this.newMessage.trim() !== '') {
      this.messages.push(this.newMessage);
      this.newMessage = '';
    }
  }

  DeleteMessage(message:string){
    const index = this.messages.indexOf(message);
    if(index > -1){
       this.messages.splice(index,1)
    }
  }

  messageTime(){
    var currentTime = new Date();
    var hour = currentTime.getHours();
    var minute = currentTime.getMinutes();
    var time = hour + ":" + minute;
    return time;
   }

   goToEvent(){
    this.NavCo.navigateForward("tabs/tabs/tab2/event-details/tab2");
    console.log('click in go to event')
   }
}
