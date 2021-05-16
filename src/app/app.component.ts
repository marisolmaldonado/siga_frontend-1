import {Component, OnInit} from '@angular/core';
import {PrimeNGConfig} from 'primeng/api';
import {environment} from '../environments/environment';
import {AuthHttpService} from './services/auth/auth-http.service';

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

    constructor(private primengConfig: PrimeNGConfig, private authHttpService: AuthHttpService) {
    }

    ngOnInit() {
        this.primengConfig.ripple = true;
        if (!localStorage.getItem('system')) {
            this.getSystem();
        }
    }

    getSystem() {
        this.authHttpService.get('systems/' + environment.SYSTEM_ID).subscribe(response => {
            localStorage.setItem('system', JSON.stringify(response['data']));
        });
    }
}
