import { getFirestore, addDoc, collection, getDoc, doc, setDoc ,getDocs,query,where} from 'firebase/firestore';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {

  constructor(private navCtrl: NavController) {}

  public messageReport="";
  public email:any;
  public eventId:any;

  ngOnInit() {
  }
  public alertButtons = ['OK'];

  backPage() {
    this.navCtrl.back();
  }
  
  styleCss1="";
  IsActive1(report:string){
    this.messageReport=report;
    console.log(this.messageReport);
    this.styleCss1="border: 2px solid white; box-shadow: inset;"
    this.styleCss2="";
    this.styleCss3="";
    this.styleCss4="";
    this.styleCss5="";
    this.styleCss6="";
    this.styleCss7="";
    this.styleCss8="";
    this.styleCss9="";
  }

  styleCss2="";
  IsActive2(report:string){
    this.messageReport=report;
    this.styleCss1=""
    this.styleCss2="border: 2px solid white; box-shadow: inset;";
    this.styleCss3="";
    this.styleCss4="";
    this.styleCss5="";
    this.styleCss6="";
    this.styleCss7="";
    this.styleCss8="";
    this.styleCss9="";
  }

  styleCss3="";
  IsActive3(report:string){
    this.messageReport=report;
    this.styleCss1=""
    this.styleCss2="";
    this.styleCss3="border: 2px solid white; box-shadow: inset;";
    this.styleCss4="";
    this.styleCss5="";
    this.styleCss6="";
    this.styleCss7="";
    this.styleCss8="";
    this.styleCss9="";
  }

  styleCss4="";
  IsActive4(report:string){
    this.messageReport=report;
    this.styleCss1=""
    this.styleCss2="";
    this.styleCss3="";
    this.styleCss4="border: 2px solid white; box-shadow: inset;";
    this.styleCss5="";
    this.styleCss6="";
    this.styleCss7="";
    this.styleCss8="";
    this.styleCss9="";
  }

  styleCss5="";
  IsActive5(report:string){
    this.messageReport=report;
    this.styleCss1=""
    this.styleCss2="";
    this.styleCss3="";
    this.styleCss4="";
    this.styleCss5="border: 2px solid white; box-shadow: inset;";
    this.styleCss6="";
    this.styleCss7="";
    this.styleCss8="";
    this.styleCss9="";
  }

  styleCss6="";
  IsActive6(report:string){
    this.messageReport=report;
    this.styleCss1=""
    this.styleCss2="";
    this.styleCss3="";
    this.styleCss4="";
    this.styleCss5="";
    this.styleCss6="border: 2px solid white; box-shadow: inset;";
    this.styleCss7="";
    this.styleCss8="";
    this.styleCss9="";
  }

  styleCss7="";
  IsActive7(report:string){
    this.messageReport=report;
    this.styleCss1=""
    this.styleCss2="";
    this.styleCss3="";
    this.styleCss4="";
    this.styleCss5="";
    this.styleCss6="";
    this.styleCss7="border: 2px solid white; box-shadow: inset;";
    this.styleCss8="";
    this.styleCss9="";
  }

  styleCss8="";
  IsActive8(report:string){
    this.messageReport=report;
    this.styleCss1=""
    this.styleCss2="";
    this.styleCss3="";
    this.styleCss4="";
    this.styleCss5="";
    this.styleCss6="";
    this.styleCss7="";
    this.styleCss8="border: 2px solid white; box-shadow: inset;";
    this.styleCss9="";
  }

  styleCss9="";
  IsActive9(report:string){
    this.messageReport=report;
    this.styleCss1=""
    this.styleCss2="";
    this.styleCss3="";
    this.styleCss4="";
    this.styleCss5="";
    this.styleCss6="";
    this.styleCss7="";
    this.styleCss8="";
    this.styleCss9="border: 2px solid white; box-shadow: inset;";
  }
  IsActive10(){
    this.styleCss1=""
    this.styleCss2="";
    this.styleCss3="";
    this.styleCss4="";
    this.styleCss5="";
    this.styleCss6="";
    this.styleCss7="";
    this.styleCss8="";
    this.styleCss9="";
  }

  userReport(){
    firebase.auth().onAuthStateChanged((user)=>{
      if (user) {
        this.email=user.email
        this.eventId=sessionStorage.getItem("idEvent"); 
        this.sendReeport(this.messageReport,this.email,this.eventId);
      } else {
        console.error("Error getting urlImg:");
      }
    });
  }


 async sendReeport(message:string,email:any,idEvent:string){
  message=this.messageReport;
    if (message !== undefined && message !== null && message.trim() !== "") {
      const db = getFirestore();
      const reportsCollection = collection(db, 'Report');
      try {
        const docRef = await addDoc(reportsCollection, {
          message: message,
          email:email,
          eventId:idEvent
        });
        alert("Thank you, the report has been received");
        console.log('Document written with ID: ', docRef.id);
      } catch (error) {
        console.error('Error adding document: ', error);
      }
    } else {
      alert('Message field is empty. You must add a message.');
    }
  }
}
