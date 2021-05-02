import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {Role, System, User} from '../../models/auth/models.index';
import {URL} from '../../../environments/environment';
import {Institution} from '../../models/app/institution';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    urlAvatar: string;
    auth: User;
    institutions: Institution[];

    constructor(private httpClient: HttpClient, private router: Router) {
        this.urlAvatar = environment.STORAGE_URL;
    }

    login(userCredentials: any, params = new HttpParams()) {
        const url = URL + 'oauth/token';
        const credentials = {
            client_id: environment.CLIENT_ID,
            client_secret: environment.CLIENT_SECRET,
            grant_type: environment.GRANT_TYPE,
            username: userCredentials.username,
            password: userCredentials.password
        };
        return this.httpClient.post(url, credentials, {params});
    }

    validateAttempts(username: string, params = new HttpParams()) {
        const url = environment.API_URL_AUTHENTICATION + 'auth/validate-attempts/' + username;
        return this.httpClient.get(url, {params});
    }

    resetAttempts(params = new HttpParams()) {
        const url = environment.API_URL_AUTHENTICATION + 'auth/reset-attempts';
        return this.httpClient.get(url, {params});
    }

    passwordForgot(username: any, params = new HttpParams()) {
        const url = environment.API_URL_AUTHENTICATION + 'auth/password-forgot';
        return this.httpClient.post(url, {username}, {params});
    }

    resetPassword(credentials: any, params = new HttpParams()) {
        const url = environment.API_URL_AUTHENTICATION + 'auth/reset-password';
        return this.httpClient.post(url, credentials, {params});
    }

    userUnlock(username: any, params = new HttpParams()) {
        const url = environment.API_URL_AUTHENTICATION + 'auth/user-unlock';
        return this.httpClient.post(url, {username}, {params});
    }

    generateTransctionalCode(username: any, params = new HttpParams()) {
        const url = environment.API_URL_AUTHENTICATION + 'auth/transactional-code';
        return this.httpClient.post(url, null, {params});
    }

    unlock(credentials: any, params = new HttpParams()) {
        const url = environment.API_URL_AUTHENTICATION + 'auth/unlock';
        return this.httpClient.post(url, credentials, {params});
    }

    getUser(username: string, params = new HttpParams()) {
        const url = environment.API_URL_AUTHENTICATION + 'users/' + username;
        return this.httpClient.get(url, {params});
    }

    logout(params = new HttpParams()) {
        const url = environment.API_URL_AUTHENTICATION + 'auth/logout';
        return this.httpClient.get(url, {params});
    }

    logoutAll(params = new HttpParams()) {
        const url = environment.API_URL_AUTHENTICATION + 'auth/logout-all?user_id=' + (JSON.parse(localStorage.getItem('user')) as User).id;
        const role = (JSON.parse(localStorage.getItem('role')) as Role).code;
        return this.httpClient.get(url, {params}).subscribe(response => {
            this.removeLogin();
            this.router.navigate(['/auth/login-' + role]);
        }, error => {
            alert(error);
        });
    }

    get(url: string, params = new HttpParams()) {
        url = environment.API_URL_AUTHENTICATION + url;
        return this.httpClient.get(url, {params});
    }

    post(url: string, data: any, params = new HttpParams()) {
        url = environment.API_URL_AUTHENTICATION + url;
        return this.httpClient.post(url, data, {params});
    }

    update(url: string, data: any, params = new HttpParams()) {
        url = environment.API_URL_AUTHENTICATION + url;
        return this.httpClient.put(url, data, {params});
    }

    delete(url: string, params = new HttpParams()) {
        url = environment.API_URL_AUTHENTICATION + url;
        return this.httpClient.delete(url, {params});
    }

    uploadAvatar(data: FormData, params = new HttpParams()) {
        const url = environment.API_URL_AUTHENTICATION + 'users/avatars';
        return this.httpClient.post(url, data, {params});
    }

    changePassword(data: any, params = new HttpParams()) {
        const url = environment.API_URL_AUTHENTICATION + 'auth/change-password';
        return this.httpClient.put(url, data, {params});
    }

    removeLogin() {
        localStorage.removeItem('user');
        localStorage.removeItem('role');
        localStorage.removeItem('institution');
        localStorage.removeItem('permissions');
        localStorage.removeItem('token');
        localStorage.removeItem('keepSession');
    }

    setUrlAvatar(url: string) {
        this.urlAvatar = environment.STORAGE_URL + url;
    }

    getUrlAvatar() {
        return this.urlAvatar;
    }

    getAuth(): User {
        return localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : null;
    }

    setAuth(user: User) {
        localStorage.setItem('auth', JSON.stringify(user));
    }

    getSystem(): System {
        return localStorage.getItem('system') ? JSON.parse(localStorage.getItem('system')) : null;
    }

    setSystem(system) {
        localStorage.setItem('system', JSON.stringify(system));
    }

    setToken(token) {
        localStorage.setItem('token', JSON.stringify(token));
    }

    getToken(token) {
        return localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null;
    }

    setInstitution(institution) {
        localStorage.setItem('institution', JSON.stringify(institution));
    }

    setRole(role) {
        localStorage.setItem('role', JSON.stringify(role));
    }

    setKeepSession(keepSession) {
        localStorage.setItem('keepSession', JSON.stringify(keepSession));
    }
}
