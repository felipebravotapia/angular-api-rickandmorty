import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { ICharacter, Result } from '../interfaces/ICharacters';
import { ISearch } from '../interfaces/ISearch';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class DataService {
  readonly URL: string = environment.URL;

  searchSubjet = new Subject<ISearch>();
  viwDetailSubjet = new Subject<number>();

  constructor(private httpClient: HttpClient) {}

  searchFn(mensaje: ISearch) {
    this.searchSubjet.next(mensaje);
  }

  viewDetailFn(id: number) {
    this.viwDetailSubjet.next(id);
  }

  getCharacters(page: number = 0): Observable<ICharacter> {
    return this.httpClient.get<ICharacter>(this.URL + `character?page=${page}`);
  }
  getCharacterById(Id: number): Observable<Result> {
    return this.httpClient.get<Result>(this.URL + `character/${Id}`);
  }

  searchChracter(search: ISearch) {
    let params = new HttpParams();
    params = params.append(search.criteria, search.search);
    return this.httpClient.get<ICharacter>(this.URL + `/character`, { params: params });
  }
}
