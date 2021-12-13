import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  username: String = '';
  role: String = '';
  createdAt: String = '';
  roles = ['Guerrier', 'Alchimiste', 'Sorcier', 'Espions', 'Enchanteur']

  constructor(private tokenService:TokenStorageService, private usersService : UsersService) { }

  ngOnInit(): void {
    const user = this.tokenService.getUser()
    if(!user){
      window.location.href = '/'
    }
    this.usersService.getById(user._id).subscribe(
      data => {
        if(!data){
          window.location.href = '/'
        }
        this.tokenService.saveUser(data)
        this.username = data.name;
        this.role = data.role;
        this.createdAt = data.date.substring(0,10);
      }
    )
  }

  disconnect(){
    this.tokenService.signOut();
    window.location.reload();
  }

  changeRole(){
    const user = this.tokenService.getUser();
    user.role = this.role;

    this.usersService.updateRole(user).subscribe(
      data => {
        console.log(data.acknowledged);
        if(!data.acknowledged){
          alert("Erreur lors du changement de rôle")
        }
      },
      err =>{
        alert("Erreur lors du changement de rôle")
      }
    )
  }

}
