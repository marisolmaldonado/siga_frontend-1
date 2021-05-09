import {Component, OnInit} from '@angular/core';
import {AppMainComponent} from '../main/app.main.component';
import {Permission, System} from '../../../models/auth/models.index';
import {AuthService} from '../../../services/auth/auth.service';
import {environment} from '../../../../environments/environment';
import {Institution} from '../../../models/app/institution';


@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {
    menus: any[];
    permissions: Permission[];
    institution: Institution;
    STORAGE_URL: string;
    system: System;

    constructor(public appMain: AppMainComponent, private authService: AuthService) {
        this.institution = this.authService.getInstitution();
        this.STORAGE_URL = environment.STORAGE_URL;
        this.system = this.authService.getSystem();
    }

    ngOnInit() {
        this.getMenus();
    }

    getMenus() {
        this.permissions = this.authService.getPermissions();
        this.menus = [{module: 0, label: 'Dashboard', icon: 'pi pi-home', routerLink: ['/dashboard']}];
        if (this.permissions) {
            this.permissions.forEach(permission => {
                const moduleIndex = this.menus.findIndex(menu => menu.module === permission.route.module.id);
                // if (permission.route.type.code === TYPE_MENUS.MENU) {
                if (permission.route.type.code === 'NORMAL') {
                    if (moduleIndex === -1) {
                        this.menus.push(
                            {
                                module: permission.route.module.id,
                                label: permission.route.module.name,
                                icon: permission.route.module.icon,
                                items: [
                                    {label: permission.route.name, icon: permission.route.icon, routerLink: [permission.route.uri]},
                                ]
                            }
                        );
                    } else {
                        this.menus[moduleIndex]['items'].push(
                            {label: permission.route.name, icon: permission.route.icon, routerLink: [permission.route.uri]},
                        );

                    }
                }
            });
        }
    }

    onMenuClick() {
        this.appMain.menuClick = true;
    }
}
