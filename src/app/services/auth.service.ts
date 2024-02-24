import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // loggedIn:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  loggedIn = new BehaviorSubject(false);

  constructor(private afAuth: AngularFireAuth,
    private toster: ToastrService,
    private router: Router) { }

  login(email:string,password:string){
    this.afAuth.signInWithEmailAndPassword(email,password).then(logRef=>{
        this.toster.success("Login successfull..");
        this.loadUser();
        this.loggedIn.next(true);
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

  logOut(){
    this.afAuth.signOut().then(()=>{
      this.toster.success('Logout Successfull..');
      localStorage.removeItem('user');
      this.loggedIn.next(false);
      this.router.navigate(['/login']);
    })
  }

  isLoggedIn(){
    return this.loggedIn.asObservable();
  }
}
