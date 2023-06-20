import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TableData } from './efccm.service';
import { catchError, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BadgeService {

  baseUrl = environment.baseUrl;
  constructor(private httpClient: HttpClient) { }

  addbadge(body: any) {
    return this.httpClient.post(`${this.baseUrl}/addbadge`, body)
  }

  allbadges() {
    return this.httpClient.get(`${this.baseUrl}/allbadges`).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError)
    )

  }
  allmodelebyemt(emt: any) {
    const resp = this.httpClient.get<TableData>(`${this.baseUrl}/getbadgebyemt/${emt}`).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError)
      )
      console.log('emt2',resp)
    return resp
  }
  

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}