import { Injectable } from '@angular/core'
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({providedIn: 'root'})

export class AppInterceptorService implements HttpInterceptor {

    constructor() {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
      const headers=new HttpHeaders(
       { 'Authorization':environment.token}
      )
      const clone=req.clone({
        headers:headers
      })
      return next.handle(clone)
    }

}
