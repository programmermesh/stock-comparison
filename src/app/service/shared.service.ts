import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'x-rapidapi-key': '7fd5c76338msh1c5427ad162335fp1c768ejsn4ab014eb0dd0',
    'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
    useQueryString: 'true',
  }),
};

@Injectable({ providedIn: 'root' })
export class SharedService {
  private baseUrl: string = environment.baseUrl;
  constructor(private _http: HttpClient) {}

  fetchStock(region: any, symbols: any): Observable<any> {
    return this._http.get<any>(
      `${this.baseUrl}?region=${region}&symbols=${symbols}`,
      httpOptions
    );
  }
}
