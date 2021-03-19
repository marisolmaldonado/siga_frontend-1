import {Component, OnInit} from '@angular/core';
import {PrimeNGConfig} from 'primeng/api';
import {AuthService} from "./services/auth/auth.service";
import {environment} from "../environments/environment";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

    horizontalMenu: boolean;

    darkMode = false;

    menuColorMode = 'light';

    menuColor = 'layout-menu-light';

    themeColor = 'blue';

    layoutColor = 'blue';

    ripple = true;

    inputStyle = 'outlined';

    constructor(private primengConfig: PrimeNGConfig, private _authService: AuthService) {
    }

    ngOnInit() {
        this.primengConfig.ripple = true;
        this.getSystem();
    }

    getSystem() {
        this._authService.get('systems/' + environment.SYSTEM_ID).subscribe(response => {
            localStorage.setItem('system', JSON.stringify(response['data']));
        })
    }
}
