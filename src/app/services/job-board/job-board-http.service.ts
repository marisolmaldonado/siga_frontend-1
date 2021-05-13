import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment, WEB} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class JobBoardHttpService {
    API_URL_JOB_BOARD: string = environment.API_URL_JOB_BOARD;

    constructor(private httpClient: HttpClient) {
    }

    get(url: string, params = new HttpParams()) {
        url = this.API_URL_JOB_BOARD + url;
        return this.httpClient.get(url, {params});
    }

    store(url: string, data: any, params = new HttpParams()) {
        url = this.API_URL_JOB_BOARD + url;
        return this.httpClient.post(url, data, {params});
    }

    update(url: string, data: any, params = new HttpParams()) {
        url = this.API_URL_JOB_BOARD + url;
        return this.httpClient.put(url, data, {params});
    }

    delete(url: string, data, params = new HttpParams()) {
        url = this.API_URL_JOB_BOARD + url;
        return this.httpClient.put(url, data, {params});
    }
}
