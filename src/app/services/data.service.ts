import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { ICharacter, Result } from '../interfaces/ICharacters';
import { ISearch } from '../interfaces/ISearch';

@Injectable({ providedIn: 'root' })
export class DataService {
  Uri: string = 'https://rickandmortyapi.com/api/character';

  searchSubjet = new Subject<ISearch>();
  viwDetailSubjet = new Subject<number>();

  constructor(private httpClient: HttpClient) {}

  searchFn(mensaje: ISearch) {
    this.searchSubjet.next(mensaje);
  }

  viewDetailFn(id: number) {
    this.viwDetailSubjet.next(id);
  }

  getCharacters(page:number = 0): Observable<ICharacter> {
    return this.httpClient.get<ICharacter>(this.Uri+`?page=${page}`);
  }
  getCharacterById(Id:number): Observable<Result> {
    return this.httpClient.get<Result>(this.Uri+`/${Id}`);
  }

  searchChracter(search:ISearch){
    let params = new HttpParams()
    params = params.append(search.criteria, search.search);
    return this.httpClient.get<ICharacter>(this.Uri+`/`,  { params: params });
  }
}
