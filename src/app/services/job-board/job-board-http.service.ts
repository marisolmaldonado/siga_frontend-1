import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment, WEB} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class JobBoardHttpService {
    API_URL_AUTHENTICATION: string = environment.API_URL_AUTHENTICATION;

    constructor(private httpClient: HttpClient) {
    }

    get(url: string, params = new HttpParams()) {
        url = this.API_URL_AUTHENTICATION + url;
        return this.httpClient.get(url, {params});
    }

    post(url: string, data: any, params = new HttpParams()) {
        url = this.API_URL_AUTHENTICATION + url;
        return this.httpClient.post(url, data, {params});
    }

    update(url: string, data: any, params = new HttpParams()) {
        url = this.API_URL_AUTHENTICATION + url;
        return this.httpClient.put(url, data, {params});
    }

    delete(url: string, params = new HttpParams()) {
        url = this.API_URL_AUTHENTICATION + url;
        return this.httpClient.delete(url, {params});
    }
}
