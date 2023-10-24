import { Component, OnInit } from '@angular/core';
import { ChatHellpInfo } from '../chat-hellp-info';
import { getFirestore, addDoc, collection } from 'firebase/firestore';
import firebase from 'firebase/compat/app';
@Component({
  selector: 'app-chat-hellp',
  templateUrl: './chat-hellp.page.html',
  styleUrls: ['./chat-hellp.page.scss'],
})
export class ChatHellpPage implements OnInit {
  public email: any = "";
  public message: string = "";
  public time: string = "";
  public MessageId:string=""

  constructor() {}

  ngOnInit() {}

  messageTime() {
    var currentTime = new Date();
    var hour = currentTime.getHours();
    var minute = currentTime.getMinutes();
    var time = hour + ":" + minute;
    return time;
  }

  messages: string[] = [];
  newMessage: string = "";

  // Remove the duplicated sendMessage method
  sendMessage() {
    if (this.newMessage.trim() !== "") {
      this.messages.push(this.newMessage);
    }
  }

  sendMessageData(){
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.email= user.email;
        this.message=this.newMessage;
        this.time=this.messageTime();
        this.sendInfoMessage(this.email,this.message,this.time)
      }
      else{
        alert('eroor');
      }
    });
  }



  // Update the following method
  sendInfoMessage(email:any,message:string,time:string) {
    let chatHellpInfo: ChatHellpInfo = {
      email: email,
      message: message,
      time: time,
    };
    this.sendInfoMessageToFirestore(chatHellpInfo);
  }

  sendInfoMessageToFirestore(chatHellpInfo: ChatHellpInfo) {
    if (chatHellpInfo !== undefined && chatHellpInfo.email !== null && chatHellpInfo.message.trim() !== "") {
      const ref = collection(getFirestore(), 'MessageHellp');
      addDoc(ref, chatHellpInfo)
        .then((docRef) => {
          this.MessageId = docRef.id;
          console.log('Document written with ID: ', this.MessageId);
          this.newMessage="";
          alert("Thank you, you will receive a response soon");
        })
        .catch((error) => {
          console.error('Error adding document: ', error);
        });
    } else {
      alert('Email or message field is empty. Both must be filled.');
    }
  }
}
