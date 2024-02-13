import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private afs: AngularFirestore,
    private toster: ToastrService) { }

  saveData(data: any) {
    this.afs.collection('categories').add(data).then(docRef => {
      console.log(docRef);
      this.toster.success('Data insert Successfull..')
    })
      .catch(err => { console.log(err) })
  }

  loadData() {
    return this.afs.collection('categories').snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, data }
      })
    }))
  }

  updateDta(id: any, editedData: any) {
    //use another method insted of collection pass the url
    this.afs.doc(`categories/${id}`).update(editedData).then(docRef =>{
      this.toster.success('Data update Successfull..')
    })
  }

  deleteData(id:any){
    this.afs.collection('categories').doc(id).delete().then(docRef=>{
      this.toster.success('Data Delete Successfull..')
    })
  }
}
