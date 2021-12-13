import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service'
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  login: String = '';
  password: String = '';
  isLoggedIn: boolean = false;
  errorMessage: string = '';

  constructor(private authService: AuthenticationService, private tokenService: TokenStorageService, private usersService: UsersService) { }

  ngOnInit(): void {
    if (this.tokenService.getToken() && this.tokenService.getUser()) {
      window.location.href = '/profile';
    }
  }

  signin(){
    const token = of("token");

    this.authService.authenticate(this.login, this.password).subscribe(
      data => {
        console.log(data);
        this.tokenService.saveToken(data.access_token)
        this.tokenService.saveUser(data.user)
        this.reloadPage();
      },
      err =>{
        this.errorMessage = err.error.message;
        console.log(err);
      });
  }

  reloadPage(): void {
    window.location.reload()
  }
}
