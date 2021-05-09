import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {Permission, Role, System, Token, User} from '../../models/auth/models.index';
import {URL} from '../../../environments/environment';
import {Institution} from '../../models/app/institution';
import {MessageService} from "../app/message.service";

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    urlAvatar: string;
    auth: User;
    institutions: Institution[];

    constructor(private httpClient: HttpClient, private router: Router, private messageService: MessageService) {
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

    incorrectPassword(username: string, params = new HttpParams()) {
        const url = environment.API_URL_AUTHENTICATION + 'auth/incorrect-password/' + username;
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
        const url = environment.API_URL_AUTHENTICATION + 'auth/user-unlocked-user';
        return this.httpClient.post(url, {username}, {params});
    }

    generateTransctionalCode(username: any, params = new HttpParams()) {
        const url = environment.API_URL_AUTHENTICATION + 'auth/transactional-code';
        return this.httpClient.post(url, null, {params});
    }

    unlock(credentials: any, params = new HttpParams()) {
        const url = environment.API_URL_AUTHENTICATION + 'auth/unlock-user';
        return this.httpClient.post(url, credentials, {params});
    }

    getUser(username: string, params = new HttpParams()) {
        const url = environment.API_URL_AUTHENTICATION + 'user/' + username;
        return this.httpClient.get(url, {params});
    }

    logout(params = new HttpParams()) {
        const url = environment.API_URL_AUTHENTICATION + 'auth/logout';
        return this.httpClient.get(url, {params});
    }

    logoutAll(params = new HttpParams()) {
        const url = environment.API_URL_AUTHENTICATION + 'auth/logout-all';
        return this.httpClient.get(url, {params}).subscribe(response => {
            this.removeLogin();
            this.router.navigate(['/auth/login']);
        }, error => {
            this.messageService.error(error);
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
        localStorage.removeItem('autn');
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

    setSystem(system: System) {
        localStorage.setItem('system', JSON.stringify(system));
    }

    getToken(): Token {
        return localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null;
    }

    setToken(token) {
        localStorage.setItem('token', JSON.stringify(token));
    }

    setInstitution(institution) {
        localStorage.setItem('institution', JSON.stringify(institution));
    }

    getPermissions(): Permission[] {
        return localStorage.getItem('permissions') === null ? null
            : JSON.parse(localStorage.getItem('permissions')) as Permission[];
    }

    getRole(): Role {
        return localStorage.getItem('role') ? JSON.parse(localStorage.getItem('role')) : null;
    }

    setRole(role: Role) {
        localStorage.setItem('role', JSON.stringify(role));
    }

    getInstitution(): Institution {
        return localStorage.getItem('institution') ? JSON.parse(localStorage.getItem('institution')) : null;
    }

    getUri(): string {
        return localStorage.getItem('uri') ? JSON.parse(localStorage.getItem('uri')) : null;
    }

    setUri(uri: string){
        localStorage.setItem('uri', JSON.stringify(uri));
    }

    getKeepSession(): boolean {
        return JSON.parse(localStorage.getItem('keepSession'));
    }

    setKeepSession(keepSession) {
        localStorage.setItem('keepSession', JSON.stringify(keepSession));
    }

    verifySession() {
        if (localStorage.getItem('keepSession') === 'true') {
            this.router.navigate(['/dashboard']);
        }
    }
}
