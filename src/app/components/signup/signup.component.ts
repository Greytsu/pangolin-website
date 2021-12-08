import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  login:String = '';
  password:String = '';
  password2:String = '';
  name:String = '';
  role:String = '';
  errorSignup:boolean = false;

  constructor(private usersService: UsersService, private authService: AuthenticationService, private tokenService: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenService.getToken() && this.tokenService.getUser()) {
      window.location.href = '/profile';
    }
  }

  signup(){

    if(!this.login || !this.password || !this.password2 || !this.name || !this.role){
      alert('Veuillez renseigner tous les champs.')
      return;
    }

    if (this.password !== this.password2){
      alert('Les mots de passe ne sont pas cohérents.')
      return;
    }

    if (this.role === 'Choisissez un role'){
      alert('Veuillez sélectionner un rôle.')
      return;
    }

    const user:User = {login:this.login, password:this.password, name:this.name, role:this.role, friends:[]}

    this.usersService.getByUsername(this.name).subscribe(
      data =>{
        if(!data){
          this.saveUser(user)
        }else{
          alert("Ce nom d'utilisateur est déjà utilisé.")
        }
      }
    )
  }

  saveUser(user:User){
    this.usersService.saveUser(user).subscribe(
      data => {
        if(data.login){
          this.signin()
        }else{
          alert('Erreur lors de la création du compte.')
        }
      },
      err => {
        alert('Erreur lors de la création du compte. \n' + err)
      }
    )
  }

  signin(){
    this.authService.authenticate(this.login, this.password).subscribe(
      data => {
        this.tokenService.saveToken(data.access_token)
        this.tokenService.saveUser(data.user)
        window.location.href = '/'
      },
      err =>{
        alert('Erreur lors de la connexion')
      });
  }

}
