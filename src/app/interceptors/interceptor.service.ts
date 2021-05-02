import {Injectable} from '@angular/core';
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {AuthService} from '../services/auth/auth.service';
import {Token} from '../models/auth/token';
import {Router} from '@angular/router';
import {Institution} from '../models/app/institution';
import {Role} from '../models/auth/role';
import {System} from '../models/auth/system';

@Injectable({
    providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

    constructor(private authService: AuthService, private router: Router) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let headers = req.headers;
        let params = req.params;
        headers = headers.append('Accept', 'application/json');
        if (localStorage.getItem('system')) {
            params = params.append('system',
                (JSON.parse(localStorage.getItem('system')) as System).id.toString());
        }
        if (localStorage.getItem('token')) {
            headers = headers.append(
                'Authorization', 'Bearer ' + (JSON.parse(localStorage.getItem('token')) as Token).access_token);
            if (!req.params.has('page')) {
                params = params.append('page', '1');
            }
            if (!req.params.has('per_page')) {
                params = params.append('page', '10');
            }
            if (localStorage.getItem('institution')) {
                params = params.append('institution',
                    (JSON.parse(localStorage.getItem('institution')) as Institution).id.toString());
            }
            if (localStorage.getItem('role')) {
                params = params.append('role',
                    (JSON.parse(localStorage.getItem('role')) as Role).id.toString());
            }
        }

        return next.handle(req.clone({headers, params})).pipe(catchError(error => {
            if (error.status === 401 || error.status === 423) {
                this.authService.removeLogin();
                this.router.navigate(['/auth/login']);
            }
            return throwError(error);
        }));
    }
}
