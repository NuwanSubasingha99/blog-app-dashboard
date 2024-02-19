import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private storage: AngularFireStorage,
    private afs: AngularFirestore,
    private toster: ToastrService) { }

  uploadImage(selectedImage: any, postData: any , formStatus:any ,id:any) {
    const filepath = `postIMG/${Date.now()}`;
    console.log(filepath)
    this.storage.upload(filepath, selectedImage).then(() => {
      console.log('post image upload succesfull');
      this.storage.ref(filepath).getDownloadURL().subscribe(URL => {
        postData.postImgPath = URL;
        console.log(postData);
        if(formStatus == 'Edit'){
          this.updateData(id,postData)
        }else{
          this.saveData(postData);
        }
        

      })
    })
  }

  saveData(postData: any) {
    this.afs.collection('posts').add(postData).then(docRef => {
      this.toster.success('Post Added Succesfuly..');

    })

  }

  loadData() {
    return this.afs.collection('posts').snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, data }
      })
    }))
  }

  loadOneData(id:string){
    return this.afs.collection('posts').doc(id).valueChanges();
    // return this.afs.doc(`posts/${id}`).valueChanges();

  }

  updateData(id:any,postData:any){

    this.afs.doc(`posts/${id}`).update(postData).then(()=>
    {
      this.toster.success('Data updated Successfully');
      
    })

  }
}
