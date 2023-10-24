import { Component, OnInit } from '@angular/core';
import { Authentication } from '../authentication/authentication';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(public authe : Authentication) {}

  ngOnInit() {
  }

  loginWithGoogle(){
    this.authe.loginWithGoogle();
  }
}
