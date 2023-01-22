import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Result } from 'src/app/interfaces/ICharacters';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss'],
})
export class CharacterDetailsComponent implements OnInit {
  @Input() _id: number = 0;
  characterDetails!: Result;
  id!: number;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.id = this._id;
    this.dataService.viwDetailSubjet.subscribe((Response) => {
      if (Response === this.id) {
        this.getCharacterById(this.id);
      }
    });
  }

  getCharacterById(id: number) {
    this.dataService.getCharacterById(id).subscribe((_characterDetails) => {
      console.log(_characterDetails);
      this.characterDetails = _characterDetails;
    });
  }
}
