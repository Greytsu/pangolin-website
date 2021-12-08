import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/User';
import { UsersService } from 'src/app/services/users.service';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  friends:String[] = [];
  friends_users:User[] = [];
  faTimes = faTimes;

  constructor(private usersService: UsersService, private tokenService: TokenStorageService) { }

  ngOnInit(): void {
    this.usersService.getById(this.tokenService.getUser()._id).subscribe(
      data => {this.tokenService.saveUser(data)
      this.friends = data.friends;
      this.friends.forEach(friend => {
        this.usersService.getById(friend).subscribe(
          data => {
            this.friends_users = [...this.friends_users, data]
          },
          err =>{
            console.log(err);
          })
      });
      })
  }

  onDelete(user:User):void{
    this.friends_users = this.friends_users.filter(friend_user => friend_user._id !== user._id);
    this.friends = this.friends.filter(friend => friend !== user._id);

    const userId = this.tokenService.getUser()._id
    this.usersService.updateFriends(userId, this.friends).subscribe(
      data => {
        this.usersService.getById(this.tokenService.getUser()._id).subscribe(
          data => {
            this.tokenService.saveUser(data)
          }
        )
      }
    )
  }

}
