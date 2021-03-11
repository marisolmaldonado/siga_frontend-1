import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AppMainComponent} from '../main/app.main.component';
import {Permission, Role, User} from "../../../models/auth/models.index";
import {AuthService} from "../../../services/auth/auth.service";
import {NgxSpinnerService} from "ngx-spinner";
import {environment} from "../../../../environments/environment";
import {Institution} from "../../../models/ignug/institution";


@Component({
    selector: 'app-topbar',
    templateUrl: 'app.topbar.component.html'
})
export class AppTopBarComponent {

    activeItem: number;
    role: Role;
    user: User;
    institution: Institution;
    megaMenus: any[];
    permissions: Permission[];
    langs: string[];
    STORAGE_URL: string;
    urlAvatar: string;

    constructor(public appMain: AppMainComponent,
                private _authService: AuthService,
                private _router: Router,
                private _spinner: NgxSpinnerService) {
        this.role = JSON.parse(localStorage.getItem('role'));
        this.user = JSON.parse(localStorage.getItem('user'));
        this.institution = JSON.parse(localStorage.getItem('institution'));
        if (!this.role) {
            this.role = {code: 'SN'};
        }
        this.getMegaMenus();
        this.STORAGE_URL = environment.STORAGE_URL;
        this.getUrlAvatar();
    }

    getMegaMenus() {
        this.permissions = JSON.parse(localStorage.getItem('permissions'));
        this.megaMenus = [];
        if (this.permissions) {
            this.permissions.forEach(permission => {
                const moduleIndex = this.megaMenus.findIndex(menu => menu.module === permission.route.module.id);
                // if (permission.route.type.code === TYPE_MENUS.MEGA_MENU) {
                if (permission.route.type.code === 'MEGA') {
                    if (moduleIndex === -1) {
                        this.megaMenus.push(
                            {
                                module: permission.route.module.id,
                                label: permission.route.module.name,
                                icon: permission.route.module.icon,
                                items: [
                                    {
                                        label: permission.route.name,
                                        icon: permission.route.icon,
                                        routerLink: permission.route.uri,
                                        description: permission.route.description
                                    },
                                ]
                            }
                        );
                    } else {
                        this.megaMenus[moduleIndex]['items'].push(
                            {
                                label: permission.route.name,
                                icon: permission.route.icon,
                                routerLink: permission.route.uri,
                                description: permission.route.description
                            },
                        );

                    }
                }
            });
        }
    }

    getUrlAvatar() {
        if (this.user) {
            if (this.user.avatar) {
                this.urlAvatar = this.STORAGE_URL + this.user.avatar;
            } else {
                if (this.user.sex) {
                    // if (this.user.sex.code === TYPE_SEXS.MALE) {
                    if (this.user.sex.code === 'MALE') {
                        this.urlAvatar = this.STORAGE_URL + 'avatars/male.png';
                    } else {
                        this.urlAvatar = this.STORAGE_URL + 'avatars/famale.png';
                    }
                } else {
                    this.urlAvatar = this.STORAGE_URL + 'avatars/anonymous.png';
                }
            }
        }
    }

    mobileMegaMenuItemClick(index) {
        this.appMain.megaMenuMobileClick = true;
        this.activeItem = this.activeItem === index ? null : index;
    }
    logOut() {
        this._spinner.show();
        this._authService.logout().subscribe(response => {
            this._spinner.hide();
            this._authService.removeLogin();
            this._router.navigate(['/auth/login']);
        }, error => {
            this._spinner.hide();
            this._authService.removeLogin();
            this._router.navigate(['/auth/login']);
        });
    }
}
