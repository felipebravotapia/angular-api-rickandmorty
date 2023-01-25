import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Info, Result } from '../../interfaces/ICharacters';
import { catchError, throwError } from 'rxjs';
import { ISearch } from '../../interfaces/ISearch';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss'],
})
export class CharactersComponent implements OnInit {
  characters!: Result[];
  info!: Info;
  p: number = 0;
  totalPages: number = 0;
  maxSize = 12;
  errorMessage!: string;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    //escuchando la busqueda
    this.dataService.searchSubjet.subscribe((Response) => {
      this.search(Response);
    });

    this.getAllCharacters(1);
  }

  onPageChange(event: any) {
    this.p = event;
    this.getAllCharacters(event);
  }

  getAllCharacters(page: number) {
    this.dataService.getCharacters(page).subscribe((_character) => {
      this.errorMessage = '';
      this.characters = _character.results;
      this.info = _character.info;
      this.totalPages = _character?.info?.count;
    });
  }

  search(data: ISearch) {
    this.dataService.searchChracter(data)
    .pipe(
      catchError((error) => {
        const { message } = error;
        this.errorMessage = message;
        return throwError(() => new Error(message));
      })
    )
    .subscribe((dataSearch) => {
      if (dataSearch) {
        this.errorMessage = '';
        this.characters = dataSearch.results;
        this.info = dataSearch.info;
        this.totalPages = dataSearch?.info?.count;
        this.p = 0;
      }
    })
  }
}
