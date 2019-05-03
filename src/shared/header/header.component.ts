import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Apiservice } from 'src/app/services/api.service';
import { Observable } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    menuData: Array<object> = [];
    headerHidden$: Observable<boolean>;
    isHeadeMenuHidden: boolean;
    constructor(
        public auth: AuthService,
        public api: Apiservice,
        public router: Router,
    ) {
        router.events.forEach((event) => {
            if (event instanceof NavigationEnd ) {
                if (event.url === '/inicio') {
                    this.menu();
                }
            }
          });
    }
    title = 'AppCondoc';

    ngOnInit() {
        this.headerHidden$ = this.auth.hide;
     }

    salir() {
        this.auth.logout();
    }

    menu() {
        const userToken = this.auth.getTokenSession();
        this.menuData = userToken.menu;
    }
}
