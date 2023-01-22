import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Info, Result } from '../../interfaces/ICharacters';

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
  maxSize = 10;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
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
      this.characters = _character.results;
      this.info = _character.info;
      this.totalPages = _character?.info?.count;
    });
  }

  search(data: string) {
    this.dataService.searchChracter(data).subscribe((dataSearch) => {
      if (dataSearch) {
        this.characters = dataSearch.results;
        this.info = dataSearch.info;
        this.totalPages = dataSearch?.info?.count;
        this.p = 0;
      }
    });
  }
}
