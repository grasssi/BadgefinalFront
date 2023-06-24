import { HttpClient, HttpErrorResponse , HttpBackend, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { map, delay } from 'rxjs/operators';

import { Movie } from '../../dashboard/movie/movie.model';
import { Paginator } from 'src/app/core/models/paginator.model';

export interface AppData {
  base: string,
  service: string,
  domaine: string,
  fonction: string,
  interne: string,
  version: string,
  horsres: string,
  nbutilisateur: string,
  application: string,
  situation: string,
  emt:string,
  modele:string,
}
export interface TableData extends Array<AppData> { }
@Injectable({
  providedIn: 'root'
})
export class EfccmService {
  // user!: UserModel;    
 
  baseUrl = environment.baseUrl;
  constructor(
  private handler: HttpBackend,
  private httpClient: HttpClient
) {
  this.httpClient = new HttpClient(handler); /// to skip interceptors, becouse this service hits third backend provider
}

list(pageIndex: number): Observable<Paginator<Movie>> {
  let params = new HttpParams();
  params = params.append('api_key', '3661411c65331184ac73d8660d0b4648');
  params = params.append('language', 'en-US');
  params = params.append('page', String(pageIndex + 1));

  return this.httpClient.get<Paginator<Movie>>(`${this.baseUrl}/allefccms`, { params })
    .pipe(
      map(response => {
        response.page = response.page - 1;
        return response;
      })
    );
}
  
  
  
listbadge(pageIndex: number): Observable<Paginator<Movie>> {
  let params = new HttpParams();
  params = params.append('api_key', '3661411c65331184ac73d8660d0b4648');
  params = params.append('language', 'en-US');
  params = params.append('page', String(pageIndex + 1));

  return this.httpClient.get<Paginator<Movie>>(`${this.baseUrl}/allbadges`, { params })
    .pipe(
      map(response => {
        response.page = response.page - 1;
        return response;
      })
    );
}
  
  
  
  
  
  
  
  
  found(body: any) {
    // console.log(body.efccm)
    return this.httpClient.post(`${this.baseUrl}/foundefccm`, body)
  }

  addefccm(body: any){
    return this.httpClient.post(`${this.baseUrl}/addeffcm`, body)
  
  }
  allefccm(){
    return this.httpClient.get(`${this.baseUrl}/allefccms`)
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
