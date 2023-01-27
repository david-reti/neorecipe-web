import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { AuthService } from "../_services/auth/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private auth: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(this.auth.currentlySignedIn) {
            const updatedRequest = req.clone({headers: req.headers.append('Authorization', `Token ${this.auth.token}`)});
            return next.handle(updatedRequest).pipe(
                tap((event: HttpEvent<any>) => {
                    if(event instanceof HttpResponse) {
                        if(event.status === 401) {
                            this.auth.signedOut(); 
                        }
                    }
            }));
        }    
        return next.handle(req);
    }
}