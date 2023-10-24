import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Use compat version if needed
import { NavController } from '@ionic/angular';
import { Authentication } from '../authentication/authentication';
import { InfoUser } from '../info-user';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-signup',
  templateUrl: 'signup.page.html',
  styleUrls: ['signup.page.scss'],
})

export class SignupPage {
  

  constructor(private navCtrl: NavController, public authen : Authentication) {
  }

  
  signIn(){
    this.authen.signIn();
  }

  public email:any;
  public gender:any;
  public age:any;
  public boost:number=0;

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
        alert('Please enter valid numbers.');
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

  
  


  goToRegister()
  {
    this.navCtrl.navigateForward(['register-by-email'])
  }

  ResaatPassword(){
    this.authen.sendPasswordResetEmail(this.authen.emailSignIn)
  }
}
