import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MessageService } from "primeng/api";
import { catchError, Observable, throwError } from "rxjs";


@Injectable({ providedIn: 'root'})
export class HttpInterceptorService implements HttpInterceptor {

    constructor(private messageService: MessageService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("HTTP request started");
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                const errorMessage = this.setError(error);
                this.messageService.add({severity: 'error', summary: errorMessage, life: 3000});
                return throwError(() => errorMessage);
            })
        );
    }

    /**
    * Handles server-side HTTP errors.
    * @param errorResponse Getting response from server in collection format or single object format
    * @returns errors in string - if response is collection, method will concatanate all in one string.
    */
    setError(errorResponse: HttpErrorResponse): string {
        let errorMessage = "";

        if(!!errorResponse.error['errors']) {
        for (const [key, value] of Object.entries(errorResponse.error['errors'])) {
                errorMessage += `${value} \n`;
            }
        } else {
            errorMessage = errorResponse.error.errorMessage;
        }

        return errorMessage;
    }
}