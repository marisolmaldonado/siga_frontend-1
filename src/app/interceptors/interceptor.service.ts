import {Injectable} from '@angular/core';
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthService} from '../services/auth/auth.service';
import {Token, Role, System} from '../models/auth/models.index';
import {Institution} from '../models/app/institution';

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
        if (this.authService.getToken()) {
            headers = headers.append(
                'Authorization', 'Bearer ' + (JSON.parse(localStorage.getItem('token')) as Token).access_token);
            if (!req.params.has('page')) {
                params = params.append('page', '1');
            }
            if (!req.params.has('per_page')) {
                params = params.append('per_page', '10');
            }
            if (this.authService.getInstitution()) {
                params = params.append('institution', this.authService.getInstitution().id.toString());
            }
            if (this.authService.getRole()) {
                params = params.append('role', this.authService.getRole().id.toString());
            }
            if (this.authService.getUri()) {
                params = params.append('uri', this.authService.getUri());
            }
        }

        return next.handle(req.clone({headers, params})).pipe(catchError(error => {
            if ((error.status === 401 || error.status === 423 || error.status === 403)
                && this.authService.getToken()) {
                this.authService.removeLogin();
                this.router.navigate(['/auth/access-denied']);
            }

            if (error.status === 403 && !localStorage.getItem('token')) {
                this.authService.removeLogin();
                this.router.navigate(['/auth/login']);
            }

            if (error.status === 503) {
                this.authService.removeLogin();
                this.router.navigate(['/auth/under-maintenance']);
            }

            return throwError(error);
        }));
    }
}
