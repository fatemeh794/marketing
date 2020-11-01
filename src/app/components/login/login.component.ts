import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginData = {
    username: '',
   password: ''
  };



  constructor(private userService: LoginService) {
  }

  ngOnInit(): void {
  }


 login(): void{
debugger;
   this.userService.login(this.loginData);

  }
}
