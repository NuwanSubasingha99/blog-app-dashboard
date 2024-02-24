import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authservise:AuthService){}

  ngOnInit(): void {
    
  }

  onSubmit(formValue:any){
    this.authservise.login(formValue.email,formValue.password);

  }

}
