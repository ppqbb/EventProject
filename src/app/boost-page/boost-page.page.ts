import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/compat/app';
import { BoostInfo } from '../boost-info';
import { getFirestore, collection, getDocs,query,where,doc, updateDoc,increment,deleteDoc } from 'firebase/firestore';
import { DetectAgePage } from '../detect-age/detect-age.page';
import { Authentication } from '../authentication/authentication';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-boost-page',
  templateUrl: './boost-page.page.html',
  styleUrls: ['./boost-page.page.scss'],
})
export class BoostPagePage implements OnInit {

  constructor(public Auth:Authentication,public alertController: AlertController) { }

  ngOnInit() {
  }
  public email:any="";
  public numberBoost:number=0;
  public eventID:string="";

  
  numberOfBoosts(Boost:number){
    firebase.auth().onAuthStateChanged(async (user)=>{
      if (user) {
        const emailUser=user.email;
        if(emailUser!==null){
          const alert = await this.alertController.create({
            header: "Are you suer?",
            buttons: [
              {
                text: 'consle',
                cssClass: 'alert-button-cancel',
              },
              {
                text: 'pay',
                cssClass: 'alert-button-cancel',
                handler: () => {
                  this.setBoost(emailUser,Boost)
                }
              }
            ]
          });
          await alert.present();
        }
      } else {
        return console.error("Error getting urlImg:");
      }
    });
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
        const boostIncrement = increment(boost);
        await updateDoc(userDoc, { [fieldToUpdate]: boostIncrement });
        console.log('Document successfully updated!');
      });
    } catch (error) {
      console.error('Error querying for documents: ', error);
    }
  }


}



























