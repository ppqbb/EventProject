import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { getStorage, ref, uploadBytes,getDownloadURL } from 'firebase/storage';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  constructor(public NavCon :NavController) {}
  public url :any;
  public stats:any;
  
  public async addNewToGallery() {
    try {
      // Take a photo
      const capturedPhoto = await Camera.getPhoto({
        resultType: CameraResultType.DataUrl, // Use DataUrl to get base64 data
        source: CameraSource.Camera,
        quality: 100
      });
      await this.uploadPhotoToFirestore(capturedPhoto.dataUrl);
      
      console.log('Photo captured and added to Storge ');
    } catch (error) {
      console.error('Error capturing photo:', error);
    }
  }
  filePath = "";
  
  private async uploadPhotoToFirestore(dataUrl: any) {
    try {
      const storge = getStorage();
      // Convert the Data URL to a Blob
      const blob = this.dataURLToBlob(dataUrl);
  
       // Define the file path
      this.filePath = "imges/" + new Date().getTime() + ".jpg";
       // Assuming `this.firs.upload` returns a promise
       // Upload the blob to Firebase Storage
      const storageRef = ref(storge, this.filePath);
      await uploadBytes(storageRef, blob);

      alert('Image uploaded successfully!');
      this.stats="ok";
       this.url = await getDownloadURL(storageRef);
       console.log(this.url);
       /*
       const db = getFirestore();
       const collectionRef = collection(db, 'photos');
       const docRef = await addDoc(collectionRef, {
        image: this.filePath,
      });*/
       
    } catch (error) {
      console.error('Error uploading photo to Firestore:', error);
      throw error; // Rethrow the error for further handling, if needed.
    }
  }

  private dataURLToBlob(dataURL: string): Blob {
    const byteString = atob(dataURL.split(',')[1]);
    const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], { type: mimeString });
  }
}


export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
}
