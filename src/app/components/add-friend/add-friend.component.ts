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
      this.usersService.getByUsername(username).subscribe(
        data => {
          if(data){
            const user:User = this.tokenService.getUser()

            this.updateUser(user, data._id)
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
