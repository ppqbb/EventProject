import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { InfoUser } from '../info-user';
import firebase from 'firebase/compat/app';
import { Authentication } from '../authentication/authentication';

@Component({
  selector: 'app-detect-age',
  templateUrl: './detect-age.page.html',
  styleUrls: ['./detect-age.page.scss'],
})
export class DetectAgePage implements OnInit {

  
  constructor(private navCtrl: NavController,public authen : Authentication) {}
  

  
  ngOnInit() {
  }
  public userAge="";
  public id="";

  infoAccount: any=[];
  textareaValue="";
  masegeFromTextarea="";
  public boost:number=0;


  async onSubmit() {
    const userAge = this.textareaValue.replace(/\D/g, '');
    try {
      if (userAge !== "" && userAge !== "00" && userAge !== "0") {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            const email: any = user.email;
            sessionStorage.setItem(email+" Age", userAge);
            this.navCtrl.navigateForward(['signup/'])
            this.getinfoFromSession()
          } else {
            this.masegeFromTextarea = 'Please enter valid numbers.';
          }
        });
      }
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }

  public email:any;
  public gender:any;
  public age:any;


  getinfoFromSession()
  {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const email: any = user.email;
        const gender:any = sessionStorage.getItem(email+" Gender");
        const age:any = sessionStorage.getItem(email+" Age");
        this.gender=gender;
        this.age=age;
        this.email=email;
        this.infoUsers();
      } else {
        console.log('Please enter valid numbers.');
      }
    });
    
  }

  infoUsers(){
    let infoUserObject: InfoUser = {
        email: this.email,
        gender: this.gender,
        age: this.age,
        boost:this.boost
    };
    this.authen.sendInfo(infoUserObject);
    }

}
