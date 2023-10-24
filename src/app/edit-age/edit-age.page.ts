import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/compat/app';
import { getFirestore, collection, query, where, getDocs, doc as FirestoreDoc, updateDoc, doc } from 'firebase/firestore';

@Component({
  selector: 'app-edit-age',
  templateUrl: './edit-age.page.html',
  styleUrls: ['./edit-age.page.scss'],
  template: `
    <ion-textarea
      placeholder="Enter numbers only"
      rows="5"
      [(ngModel)]="textareaValue"
    ></ion-textarea>

    <button (click)="onSubmit()">Submit</button>
  `
})
export class EditAgePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  textareaValue="";
  masegeFromTextarea="";

  onSubmit() {
    const numericValue = this.textareaValue.replace(/\D/g, '');
    if (numericValue === '') {
      this.masegeFromTextarea='Please enter numbers only.';
      return;
    }
    else if(numericValue == "00" || numericValue =="0")
    {
      this.masegeFromTextarea='Please enter valid numbers.';
    }
    else{
      console.log('Sending data:', numericValue);
      this.updateAge(numericValue);
    }
    this.masegeFromTextarea='';
  }

  updateAge(NewAge:string){
    firebase.auth().onAuthStateChanged((user)=>{
      if (user) {
        const emailUser=user.email;
        if(emailUser!==null){
          this.UpdateAccont(emailUser,NewAge)
          alert("Age has been updated successfully");
        }
      } else {
        return console.error("Error getting urlImg:");
      }
    });
  }

  async UpdateAccont(email:string,ageUpdate:string){ 
  const db = getFirestore(); // Initialize Firestore
  const collectionRef = collection(db, 'Users'); // Replace 'your_collection_name' with your actual collection name
  const queryyy = query(collectionRef, where('email', '==', email));
  try {
    const querySnapshot = await getDocs(queryyy);
    querySnapshot.forEach((docSnap) => {
      const userDoc = doc(db, 'Users', docSnap.id); // Create a reference to the document
      const newData = {
        age: ageUpdate, // Update the 'age' field with the new value
      };

      // Update the document
      updateDoc(userDoc, newData)
        .then(() => {
          console.log('Document successfully updated!');
        })
        .catch((error) => {
          console.error('Error updating document: ', error);
        });
    });
  } catch (error) {
    console.error('Error querying for documents: ', error);
  }
 }
}
