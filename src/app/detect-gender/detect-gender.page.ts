import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import firebase from 'firebase/compat/app';
import { Authentication } from '../authentication/authentication';


@Component({
  selector: 'app-detect-gender',
  templateUrl: './detect-gender.page.html',
  styleUrls: ['./detect-gender.page.scss'],
})
export class DetectGenderPage implements OnInit {

  constructor(private navCtrl: NavController,public authen : Authentication) {}

  public userGender="";
  public id="";
  ngOnInit() {
  }
  styleCss1="";
  IsActive1(){
    this.styleCss1="border: 2px solid white; box-shadow: inset;";
    this.styleCss2="";
    this.styleCss3="";
    this.userGender="male";
    
  }

  styleCss2="";
  IsActive2(){
    this.styleCss1="";
    this.styleCss2="border: 2px solid white; box-shadow: inset;";
    this.styleCss3="";
    this.userGender="female";
    
  }

  styleCss3="";
  IsActive3(){
    this.styleCss1="";
    this.styleCss2="";
    this.styleCss3="border: 2px solid white; box-shadow: inset;";
    this.userGender="undefined";
    
  }
  IsActiveClear(){
    this.styleCss1=""
    this.styleCss2="";
    this.styleCss3="";
  }

  
  backPage() {
    this.navCtrl.back();
  }

  goToAgePage(){
    this.navCtrl.navigateForward(['detect-age'])
  }

  
  async sendGenderDB() {
    try {
      const userGender = this.userGender;
        if (userGender.trim() !== "") {
          firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              const email: any = user.email;
              sessionStorage.setItem(email+" Gender", userGender);
              this.goToAgePage();
            } else {
              console.log('Please enter valid numbers.');
            }
          });
        }
    } catch (e) {
      
      console.error('Error adding document: ', e);
    }
  }
}
