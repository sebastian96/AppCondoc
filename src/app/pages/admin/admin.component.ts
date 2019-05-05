import { Component, OnInit } from '@angular/core';
import { Apiservice } from 'src/app/services/api.service';
import { AuthService } from '../../services/auth.service';
import { log } from 'util';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  
  Users: Array<object> = [];

  constructor(
    private apilogin: Apiservice,
    private auth: AuthService
  ) { 
    this.getUsers()
  }

  ngOnInit() {
  }
  
  getUsers() {
    const userToken = this.auth.getTokenSession();
    this.Users.push(userToken);
  }
}
