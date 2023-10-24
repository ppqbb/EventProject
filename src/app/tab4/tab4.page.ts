import { Component, OnInit,ViewChild } from '@angular/core';
import { Authentication } from '../authentication/authentication';
import firebase from 'firebase/compat/app';
import { getFirestore,collection,getDocs,query,where } from 'firebase/firestore';
import { RouterOutlet, Router, ActivationStart } from '@angular/router';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})

export class Tab4Page implements OnInit {

  @ViewChild(RouterOutlet) outlet!: RouterOutlet;
  
  constructor(public authen : Authentication,public router:Router) {
    
  }

  ngOnInit(): void {
    this.router.events.subscribe(e => {
      if (e instanceof ActivationStart && e.snapshot.outlet === "administration")
        this.outlet.deactivate();
        this.userAthe();
    });
  }

  public email:any;
  public age="";
  public loca="";
  public gender="";
  public boost="";
  public rank="";
  public infoAccount: any;
  roting='';

  public alertButtons2 = [
    {
      text: 'No',
      cssClass: 'alert-button-cancel',
    },
    {
      text: 'Yes',
      cssClass: 'alert-button-confirm',
      handler: () => {
        this.authen.userAtheDelete();
      },
    },
  ];

  public alertButtons3 = [
    {
      text: 'No',
      cssClass: 'alert-button-cancel',
    },
    {
      text: 'Yes',
      cssClass: 'alert-button-confirm',
      handler: () => {
        this.authen.logout();
      },
    },
  
  ];
  



  userAthe(){
    firebase.auth().onAuthStateChanged((user)=>{
      if (user) {
        this.email=user.email;
        this.getData(this.email)
      } else {
        console.error("Error getting urlImg:");
      }
    });
  }

  async getData(email:any){
    try {
      const ref = collection(getFirestore(),'Users');
      const q = query(ref, where('email','==',email));
      const gsnap = await getDocs(q);
      gsnap.forEach((doc) => {
        this.infoAccount=doc.data();
      });
      console.log(this.infoAccount)
    } catch (error) {
      console.error("Error getting urlImg:", error);
    }
  }
}
