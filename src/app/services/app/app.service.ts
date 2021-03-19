import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class AppService {
    private headers: HttpHeaders;

    constructor(private _http: HttpClient) {

    }

    get(url: string) {
        this.headers = new HttpHeaders()
            .set('X-Requested-With', 'XMLHttpRequest')
            .append('Content-Type', 'application/json')
            .append('Accept', 'application/json');
        // .append('Authorization', 'Bearer ' + localStorage.getItem('accessToken').replace('"', ''));
        url = environment.API_URL_APP + url;
        return this._http.get(url, {headers: this.headers});
    }

    post(url: string, data: any) {
        this.headers = new HttpHeaders()
            .set('X-Requested-With', 'XMLHttpRequest')
            .append('Content-Type', 'application/json')
            .append('Accept', 'application/json');
        // .append('Authorization', 'Bearer ' + localStorage.getItem('accessToken').replace('"', ''));
        url = environment.API_URL_APP + url;
        return this._http.post(url, data, {headers: this.headers});
    }

    update(url: string, data: any) {
        this.headers = new HttpHeaders()
            .set('X-Requested-With', 'XMLHttpRequest')
            .append('Content-Type', 'application/json')
            .append('Accept', 'application/json');
        // .append('Authorization', 'Bearer ' + localStorage.getItem('accessToken').replace('"', ''));
        url = environment.API_URL_APP + url;
        return this._http.put(url, data, {headers: this.headers});
    }

    delete(url: string) {
        this.headers = new HttpHeaders()
            .set('X-Requested-With', 'XMLHttpRequest')
            .append('Content-Type', 'application/json')
            .append('Accept', 'application/json');
        // .append('Authorization', 'Bearer ' + localStorage.getItem('accessToken').replace('"', ''));
        url = environment.API_URL_APP + url;
        return this._http.delete(url, {headers: this.headers});
    }

    uploadFiles(data: FormData,params = new HttpParams()) {
        const url = environment.API_URL_APP + 'files';
        return this._http.post(url, data, {params});
    }

    uploadImages(data: FormData,params = new HttpParams()) {
        const url = environment.API_URL_APP + 'images';
        return this._http.post(url, data, {params});
    }

    getCatalogues(params = new HttpParams()) {
        const url = environment.API_URL_APP + 'catalogues';
        return this._http.get(url, {params});
    }

    getLocations(params = new HttpParams()) {
        const url = environment.API_URL_APP + 'locations';
        return this._http.get(url, {params});
    }
    getCountries(params = new HttpParams()) {
        const url = environment.API_URL_APP + 'countries';
        return this._http.get(url, {params});
    }
}
