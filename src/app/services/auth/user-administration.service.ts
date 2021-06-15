import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {Permission, Role, System, Token, User} from '../../models/auth/models.index';
import {MessageService} from '../../pages/shared/services/message.service';

@Injectable({
    providedIn: 'root'
})
export class UserAdministrationService {
    API_URL_AUTHENTICATION: string = environment.API_URL_AUTHENTICATION;

    constructor(private httpClient: HttpClient){
    }

    get(url: string, params = new HttpParams()) {
        url = this.API_URL_AUTHENTICATION + url;
        return this.httpClient.get(url, {params});
    }

    store(url: string, data: any, params = new HttpParams()) {
        url = this.API_URL_AUTHENTICATION + url;
        return this.httpClient.post(url, data['user'], {params});
    }

    update(url: string, data: any, params = new HttpParams()) {
        url = this.API_URL_AUTHENTICATION + url;
        return this.httpClient.put(url, data['user'], {params});
    }

    delete(url: string, ids, params = new HttpParams()) {
        url = this.API_URL_AUTHENTICATION + url;
        return this.httpClient.put(url, {ids}, {params});
    }

    add(url: string, ids, params = new HttpParams()) {
        url = this.API_URL_AUTHENTICATION + url;
        return this.httpClient.post(url, {ids}, {params});
    }

    set(url: string, ids, params = new HttpParams()) {
        url = this.API_URL_AUTHENTICATION + url;
        return this.httpClient.put(url, {ids}, {params});
    }

}