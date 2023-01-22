import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  EventEmitter,
  Output,
  AfterViewInit,
} from '@angular/core';
import { Result } from 'src/app/interfaces/ICharacters';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit, AfterViewInit {
  @Input() _dataCharacter!: Result[];
  id = new EventEmitter<any>();
  colors:string='';
  public removeEventListener!: () => void;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  public handleAnchorClick(event: Event) {
    event.preventDefault();
    const anchor = event.target as HTMLAnchorElement;
    if (anchor.parentElement?.className.includes('mc-active')) {
      anchor.parentElement?.classList.remove('mc-active');
    } else {
      this.renderer.addClass(anchor.parentElement, 'mc-active');
    }
  }

  ngOnInit(): void {
    this.removeEventListener = this.renderer.listen(
      this.elementRef.nativeElement,
      'click',
      (event) => {
        if (event.target instanceof HTMLAnchorElement) {
          event.preventDefault();
          this.handleAnchorClick(event);
        }
      }
    );
  }
  ngAfterViewInit(): void {

  }

  onCallDetailse(id: number) {
    this.id.emit(id);
  }

}
