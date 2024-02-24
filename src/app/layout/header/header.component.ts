import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  userEmail?: string;
  isLoggedIn$?: Observable<boolean>;

  constructor(private authServise: AuthService) { }

  ngOnInit(): void {

    this.userEmail = JSON.parse(localStorage.getItem('user') || '{ }').email;
    //this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

    this.isLoggedIn$ = this.authServise.isLoggedIn();
  }

  onLogOut() {

    this.authServise.logOut();

  }

}
