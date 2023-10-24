import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Authentication } from '../authentication/authentication';


@Component({
  selector: 'app-register-by-email',
  templateUrl: './register-by-email.page.html',
  styleUrls: ['./register-by-email.page.scss'],
})

export class RegisterByEmailPage implements OnInit {
  constructor(
    private navCtrl: NavController,
    private router: Router,
    public authen : Authentication
  ) {}

  ngOnInit() {}

  BackPage() {
    this.navCtrl.back();
  }


  register(){
    this.authen.register();
  }
}
