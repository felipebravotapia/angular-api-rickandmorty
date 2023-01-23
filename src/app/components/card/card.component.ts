import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { Result } from 'src/app/interfaces/ICharacters';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() _dataCharacter!: Result[];
  colors: string = '';
  public removeEventListener!: () => void;

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private dataService: DataService
  ) {}

  public handleAnchorClick(event: Event) {
    event.preventDefault();
    this.clickAnchor(event);
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

  onCallDetailse(id: number, event: any) {
    this.clickIcon(event);
    this.dataService.viewDetailFn(id);
  }

  clickIcon(event: any) {
    const icon = event.target;

    const Anchor = icon.parentElement;
    const article = Anchor.parentElement.classList;
    if (article.value.includes('mc-active')) {
      /* icon.parentElement.classList
        .removeClass('fa-bars')
        .removeClass('fa-spin-fast')
        .addClass('fa-arrow-left'); */
      this.renderer.removeClass(Anchor.parentElement, 'mc-active');
    } else {
      icon.parentElement
      /* icon.parentElement.classList.value
        .removeClass('fa-arrow-left')
        .removeClass('fa-spin-fast')
        .addClass('fa-bars'); */
      this.renderer.addClass(Anchor.parentElement, 'mc-active');
    }
  }

  clickAnchor(event: Event) {
    const anchor = event.target as HTMLAnchorElement;
    if (anchor.parentElement?.className.includes('mc-active')) {
      this.renderer.removeClass(anchor.parentElement, 'mc-active');
    } else {
      this.renderer.addClass(anchor.parentElement, 'mc-active');
    }
  }
}
