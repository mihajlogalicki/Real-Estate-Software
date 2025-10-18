import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MessageService } from "primeng/api";
import { catchError, Observable, retry, throwError, timer } from "rxjs";
import { ErrorCode } from "../Enums/enums";

@Injectable({ providedIn: 'root'})
export class HttpInterceptorService implements HttpInterceptor {

    constructor(private messageService: MessageService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("HTTP request started");
        return next.handle(request).pipe(
            retry({count: 2, delay: this.retryRequestWhen}),
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
        
        if(!!errorResponse.error && !!errorResponse.error['errors']) {
        for (const [key, value] of Object.entries(errorResponse.error['errors'])) {
                errorMessage += `${value} \n`;
            }
        } 
        else if(errorResponse.status === 401) {
            errorMessage = "Unauthorized";
        }
        else {

            if(!!errorResponse.error.errorMessage){
                errorMessage = errorResponse.error.errorMessage;
            } else {
                  errorMessage = errorResponse.error ?? "Unknown server error occured.";   
            }           
        }

        /*TODO: Handle all error cases: 
        1) Not authorized for set-primary photo, 
        2) Delete photo,
        3) Already primary photo, 
        4) Is not owner of the property, only owner can update primary photo and delete
        */
        return errorMessage;
    }

    /** @param error Retry new HTTP request when SERVER or DATABASE is temporarily down */
    retryRequestWhen(error: HttpErrorResponse){
        if(error.status === ErrorCode.ServerDown) {
            return timer(500);
        }

        return throwError(() => error);
    }
}