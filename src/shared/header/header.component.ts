import { Component, OnInit } from '@angular/core';
import { SessionGuard } from 'src/app/services/guards/session.guard';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    menuData: object = {};
    constructor(
        public session: SessionGuard,
        public auth: AuthService
    ) { }
    title = 'AppCondoc';

    ngOnInit() {
        this.menu();
    }

    salir() {
       this.auth.logout();
       const menu = document.querySelectorAll('#items_menu');
    }

    menu() {
        const token = sessionStorage.getItem('token');
        const user = this.auth.decode(token);
        console.log(user.menu);
        this.menuData = user.menu;
    }
}
