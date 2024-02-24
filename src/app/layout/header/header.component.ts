import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  userEmail?: string;

  constructor() { }

  ngOnInit(): void {

    this.userEmail = JSON.parse(localStorage.getItem('user') || '{ }').email;
    //this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

  }

}
