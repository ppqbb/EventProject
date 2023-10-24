import { Component, OnInit } from '@angular/core';
import { Authentication } from '../authentication/authentication';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register-send-email',
  templateUrl: './register-send-email.page.html',
  styleUrls: ['./register-send-email.page.scss'],
})
export class RegisterSendEmailPage implements OnInit {

  constructor(private navCtrl: NavController,public authen : Authentication) { }

  ngOnInit() {
  }
  public emil:string="";

  ResaatPassword(){
  this.authen.sendPasswordResetEmail(this.emil)
  }

  goToSingeUp(){
    this.navCtrl.navigateForward(["signup"]);
  }

}
