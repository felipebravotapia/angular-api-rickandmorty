import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { DataService } from '../../services/data.service';
import { Result } from 'src/app/interfaces/ICharacters';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss'],
})
export class CharacterDetailsComponent implements OnInit, OnDestroy {
  @Input() _id: number = 0;
  characterDetails!: Result;
  id!: number;
  sub: any;
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.id = this._id;
    this.sub = this.dataService.viwDetailSubjet.subscribe((Response) => {
      if (Response === this.id) {
        this.getCharacterById(this.id);
      }
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getCharacterById(id: number) {
    this.dataService.getCharacterById(id).subscribe((_characterDetails) => {
      this.characterDetails = _characterDetails;
    });
  }
}
