import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.css']
})
export class AddFriendComponent implements OnInit {

  username:String = '';

  constructor(private usersService: UsersService, private tokenService: TokenStorageService) { }

  ngOnInit(): void {
  }

  addFriend(username:String){
    if(username){
      const user:User = this.tokenService.getUser()
      this.usersService.getByUsername(username).subscribe(
        data => {
          if(data){
            const friend:User = data
            if(friend._id && user._id){
              this.updateUser(user, friend._id)
              this.updateUser(data, user._id)
            }
          }else{
            if(user._id){
              const userToCreate:User = {login:username+'@appartoo.com', password:username, name:username, role:'Guerrier', friends:[user._id]}
              this.usersService.saveUser(userToCreate).subscribe(
                data => {
                  console.log(data)
                  this.updateUser(user, data._id)
                },
                error =>{
                  console.log(error);
                }
              )
            }
          }
        }
      )
    }else{
      alert("Veuillez entrer un nom d'utilisateur")
    }
  }

  updateUser(user:User, newFriendId:String){
    if(user._id){
      this.usersService.updateFriends(user._id, [...user.friends, newFriendId]).subscribe(
        data => {
          window.location.reload()
        }
      )
    }
  }


}
