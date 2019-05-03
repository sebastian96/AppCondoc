import { Component, OnInit } from '@angular/core';
import { Apiservice } from 'src/app/services/api.service';
import { log } from 'util';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private apilogin: Apiservice) { }

  ngOnInit() {
  }

}
