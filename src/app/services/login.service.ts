import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {GetdataService} from './getdata.service';
// import {MatSnackBar} from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private tokenKey = 'token';
  private nameKey = 'name';



  constructor(private http: HttpClient , private router: Router , private generalDataService: GetdataService) {
  }
  private  showError(error): any{
    console.log(error.status);
    // this.snackBar.open(error, 'close' ,
    // {
    //   duration: 1000
    // }
    // );
  }


  login(loginData): any {
    debugger;
    const formdata = new FormData();
    formdata.append( 'Username' , loginData.username);
    formdata.append( 'Password' , loginData.password);
    console.log(loginData);
    this.http.post(this.generalDataService.baseAddress + 'Users/Login', formdata)
      .subscribe(res => {
        console.log(res);
        this.authenticate(res);
        if (this.isAuthentication)
        {this.router.navigate(['/main']); }
      }, error => {this.showError(error); } );
  }

  private authenticate(res): void {
    const authentication = res;
    localStorage.setItem(this.nameKey, authentication.nameKey);
    localStorage.setItem(this.tokenKey, authentication.tokenKey);
  }

  get isAuthentication(): boolean {
    return !!this.tokenKey;
  }

}

