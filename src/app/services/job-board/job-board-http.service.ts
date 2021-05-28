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
    verifyIdentification(identification) {
        const params = new HttpParams().append('identification',identification);
        const url = this.API_URL_JOB_BOARD +'company/verify';
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

    delete(url: string, ids, params = new HttpParams()) {
        url = this.API_URL_JOB_BOARD + url;
        return this.httpClient.put(url, {ids}, {params});
    }

    uploadFiles(url, data: FormData, params = new HttpParams()) {
        url = this.API_URL_JOB_BOARD + url;
        return this.httpClient.post(url, data, {params});
    }

    getFiles(url, params = new HttpParams()) {
        url = this.API_URL_JOB_BOARD + url;
        return this.httpClient.get(url, {params});
    }
}
