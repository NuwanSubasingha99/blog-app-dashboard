import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth,
    private toster: ToastrService) { }

  login(email:string,password:string){
    this.afAuth.signInWithEmailAndPassword(email,password).then(logRef=>{
        this.toster.success("Login successfull..")
    }).catch(e=>{
      this.toster.warning(e);
    })
  }
}
