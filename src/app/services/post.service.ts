import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private storage: AngularFireStorage,
    private afs:AngularFirestore,
    private toster: ToastrService) { }

    uploadImage(selectedImage:any, postData:any){
      const filepath =`postIMG/${Date.now()}`;
      console.log(filepath)
      this.storage.upload(filepath,selectedImage).then(()=>{
        console.log('post image upload succesfull');
        this.storage.ref(filepath).getDownloadURL().subscribe(URL =>{
          postData.postImgPath = URL;
          console.log(postData);

          this.afs.collection('posts').add(postData).then(docRef =>{
            this.toster.success('Post Added Succesfuly..');
            console.log('post added succesfuly ....')
          })
        })
      })
    }
}
