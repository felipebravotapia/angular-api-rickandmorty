import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { ICharacter, Result } from '../interfaces/ICharacters';

@Injectable({ providedIn: 'root' })
export class DataService {
  Uri: string = 'https://rickandmortyapi.com/api/character';

  searchSubjet = new Subject<string>();

  constructor(private httpClient: HttpClient) {}

  searchFn(mensaje: string) {
    this.searchSubjet.next(mensaje);
  }

  getCharacters(page:number = 0): Observable<ICharacter> {
    return this.httpClient.get<ICharacter>(this.Uri+`?page=${page}`);
  }
  getCharacterById(Id:number): Observable<Result> {
    return this.httpClient.get<Result>(this.Uri+`/${Id}`);
  }

  searchChracter(search:string){
    return this.httpClient.get<ICharacter>(this.Uri+`/?name=${search}`);
  }
}
