import { Component, OnInit } from '@angular/core';
import { log } from 'util';
import { SessionGuard } from 'src/app/services/guards/session.guard';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor( public auth: SessionGuard) { }
  
  title = 'AppCondoc';

  ngOnInit() {
  }

  salir(){
    console.log("salir");
  }
}
