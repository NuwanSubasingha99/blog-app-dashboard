import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth,
    private toster: ToastrService,
    private router: Router) { }

  login(email:string,password:string){
    this.afAuth.signInWithEmailAndPassword(email,password).then(logRef=>{
        this.toster.success("Login successfull..");
        this.loadUser();
        this.router.navigate(['/'])
    }).catch(e=>{
      this.toster.warning(e);
    })
  }

  loadUser(){
    this.afAuth.authState.subscribe(user =>{
      localStorage.setItem('user',JSON.stringify(user));
    })
  }
}
