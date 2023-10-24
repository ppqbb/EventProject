import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {NavController} from '@ionic/angular';
import firebase from 'firebase/compat/app';
import { InfoUser } from '../info-user';
import { getAuth, signInWithPopup, GoogleAuthProvider,deleteUser } from "firebase/auth";
import { getFirestore, addDoc, collection, getDocs,query,where } from 'firebase/firestore';
import { doc, deleteDoc } from "firebase/firestore";
import { BoostInfo } from '../boost-info';

@Injectable({
  providedIn: 'root'
})


export class Authentication {

  
  public user : any;
  public emailGoogle:any;
  public data:any=[];

  public validationEmailGoogle:any;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private navCtrl: NavController,
    
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user){
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', "");
      }
    }
  )}





  public userID = firebase.auth().currentUser;
  email = '';
  password = '';
  confirmPassword = '';

  emailSignIn = '';
  passwordSignIn = '';

  label: string = '';

  async signIn() {
    try {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      const minLength = 8;
      const hasUppercase = /[A-Z]/.test(this.passwordSignIn);
      const hasLowercase = /[a-z]/.test(this.passwordSignIn);
      const hasNumbers = /\d/.test(this.passwordSignIn);
      if (this.emailSignIn !== "" && this.passwordSignIn !== ""){
        if(emailRegex.test(this.emailSignIn)){
          if (this.passwordSignIn.length >= minLength && hasUppercase && hasLowercase && hasNumbers){
      await this.afAuth.signInWithEmailAndPassword(this.emailSignIn, this.passwordSignIn);
      
      // Sign-in successful, navigate to another page or perform other actions here
      this.navCtrl.navigateForward(['tabs']); // Navigate to the dashboard page or another page
      this.email = '';
      this.password = '';
      this.confirmPassword = '';
              
      this.emailSignIn = '';
      this.passwordSignIn = '';
              
     this.label = '';
          }else{
            this.label = "Password must be at least 8 characters, contain uppercase and lowercase letters, and include numbers.";
          }
        }else{
          this.label = "Invalid email format";
        }
      }else{
        this.label = "All fields are required";
      }
    } catch (error:any) {
      if (error.code === 'auth/wrong-password') {
        this.label = 'Password is incorrect. Please try again.';
      }else if (error.code === 'auth/invalid-email') {
        this.label = 'Email is invalid. Please check your email.'; 
      }else{
        console.error('Sign-in error:', error);
        this.label = 'An error occurred during the login process. Please try again later.';
      }
    }
  }

  sendInfo(infouser:InfoUser)
  {
    const ref =collection(getFirestore(),'Users')
    addDoc(ref,infouser)
    if(this.emailGoogle!==undefined)
    {
      this.navCtrl.navigateForward(['tabs']);
    }
  }

  sendBoost(boostInfo:BoostInfo)
  {
    const ref =collection(getFirestore(),'Boost')
    addDoc(ref,boostInfo)
    alert("boosted event successfully");
  }

  

  async register() {
    try {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      const minLength = 8;
      const hasUppercase = /[A-Z]/.test(this.password);
      const hasLowercase = /[a-z]/.test(this.password);
      const hasNumbers = /\d/.test(this.password);

      if (this.password === this.confirmPassword) {
        if (this.email !== "" && this.password !== "" && this.confirmPassword !== "") {
          if (emailRegex.test(this.email)) {
            if (this.password.length >= minLength && hasUppercase && hasLowercase && hasNumbers) {
              // Check if the email is already in use
              const methods = await this.afAuth.fetchSignInMethodsForEmail(this.email);

              if (methods.length === 0) {
                // Email is not in use, proceed with registration
                const userCredential = await this.afAuth.createUserWithEmailAndPassword(
                  this.email,
                  this.password
                );
                

                // Registration success logic (navigate to a success page or show a success message)
                
                this.password = '';
                this.confirmPassword = '';
              
                this.emailSignIn = '';
                this.passwordSignIn = '';
              
                this.label = '';

                this.navCtrl.navigateForward(['/detect-gender']);
              } else {
                // Email is already in use
                this.label = 'The email is already in use. Please choose a different email.';
              }
            } else {
              this.label = "Password must be at least 8 characters, contain uppercase and lowercase letters, and include numbers.";
            }
          } else {
            this.label = "Invalid email format";
          }
        } else {
          this.label = "All fields are required";
        }
      } else {
        this.label = "Passwords do not match";
      }
    } catch (error) {
      console.error('Firebase Authentication Error:', error);
      this.label = "An error occurred during registration. Please try again later.";
    }
  }

  userAtheDelete(){
    firebase.auth().onAuthStateChanged((user)=>{
      if (user) {
        const emailUser=user.email;
        if(emailUser!==null){
        this.DeleteAccont(emailUser);
        }
      } else {
        return console.error("Error getting urlImg:");
      }
    });
  }

  async DeleteAccont(email:string){
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
    deleteUser(user)
      .then(async () => {
      const db = getFirestore();
      const collectionRef = collection(db, 'Users');
      const queryRef = query(collectionRef, where('email', '==', email));
      const querySnapshot = await getDocs(queryRef);
      querySnapshot.forEach((doc) => {
        deleteDoc(doc.ref)
          .then(() => {
            console.log('Document successfully deleted!');
          })
      this.email = '';
      this.password = '';
      this.confirmPassword = '';
      this.emailSignIn = '';
      this.passwordSignIn = '';        
      this.label = '';
      this.navCtrl.navigateForward(['/register']);
      })
    });
    }
  }
  


  async logout() {
    try {
      await this.afAuth.signOut();
      this.email = '';
      this.password = '';
      this.confirmPassword = '';
      this.emailSignIn = '';
      this.passwordSignIn = '';        
      this.label = '';
      
      this.navCtrl.navigateForward(['/register']);
    } catch (error) {
      console.error('Error while logging out:', error);
    }
  }

  get isLoggedIn(): boolean {
    const userString = localStorage.getItem('user');
    if (userString !== null) {
        const user = JSON.parse(userString);
        return user !== null;
    }
    return false;
 }


 async sendPasswordResetEmail(passwordResetEmail: string) {
  try {
    await this.afAuth.sendPasswordResetEmail(passwordResetEmail);
    this.label = 'Password reset email sent successfully';
  } catch (error: any) {
    console.error('Error sending password reset email:', error);
    // Check the error code to determine the specific error
    if (error.code === 'auth/user-not-found') {
      this.label = 'User with this email does not exist';
    } else {
      this.label = 'An error occurred while sending the password reset email';
    }
  }
 }


 loginWithGoogle() {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider)
    .then(async (result:any) => {
      const additionalUserInfo = result.user;
      const email = additionalUserInfo.email;
      
      // Check if the user is already registered (i.e., their email exists in Firebase Authentication)
      const methods = await this.afAuth.fetchSignInMethodsForEmail(email);
      if (methods.length === 0) {
        // The user is not registered, navigate to the registration page
        this.navCtrl.navigateForward(['detect-location']);
      } else {
        // The user is registered, navigate to the main page
        this.navCtrl.navigateForward(['tabs']);
      }
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      
      const email = error.customData ? error.customData.email : null;
      const credential = GoogleAuthProvider.credentialFromError(error);
      // Handle errors as needed
      console.error(`Error Code: ${errorCode}`);
      console.error(`Error Message: ${errorMessage}`);
      // ...
    });
}


async getideven(email: any) {
  try {
    const emailS:string=email.toString();
    const ref = collection(getFirestore(), "Users");
    const q = query(ref, where("email", "==", emailS));
    const gsnap = await getDocs(q);
    gsnap.forEach((doc) => {
      this.data.push(doc.data());
      if(this.data.email==undefined){
        this.navCtrl.navigateForward(['detect-location']);
      }else{
        this.navCtrl.navigateForward(['tabs']);
      }
    });
  } catch (error) {
    console.error("Error getting urlImg:", error);
  }
}
 
}