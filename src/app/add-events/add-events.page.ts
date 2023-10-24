import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { SendMessages} from '../sendMesseges/send-messages'
import { NavController } from '@ionic/angular';
import { Geolocation, } from '@capacitor/geolocation';
@Component({
  selector: 'app-add-events',
  templateUrl: './add-events.page.html',
  styleUrls: ['./add-events.page.scss'],
  
})


export class AddEventsPage implements OnInit {
  let: any;

  
  constructor(public photoService: PhotoService ,public eventMessage:SendMessages,private navCtrl: NavController,public geolocation:Geolocation) { 
   
  }

  public lat:any=0;
  public lng:any=0;
  
  goBack() {
    this.navCtrl.back();
  }

  addPhotoToGallery() {
  this.photoService.addNewToGallery();

  }
  
  ngOnInit() {
    this.printCurrentPosition();
}

  printCurrentPosition = async () => {
  const coordinates = await Geolocation.getCurrentPosition();
  console.log('Current position:', coordinates);

  this.lat = coordinates.coords.latitude;
  this.lng = coordinates.coords.longitude;
  sessionStorage.setItem("lat",this.lat);
  sessionStorage.setItem("lng",this.lng);
};

  sendMessageText(){
    this.eventMessage.TextDB; // Set the text you want to send
    this.eventMessage.sendEventDB(); 
  }

}




