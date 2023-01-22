import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appRandomColor]',
})
export class RandomColorDirective {
  constructor(private element: ElementRef) {}

  ngOnInit() {
    this.element.nativeElement.classList.add(this.getRandomColor());
  }

  getRandomColor() {

    const colors = [
      'Red',
      'Pink',
      'Deep-Purple',
      'Indigo',
      'Light-Blue',
      'Cyan',
      'Teal',
      'Green',
      'Light-Green',
      'Lime',
      'Yellow',
      'Amber',
      'Orange',
      'Deep-Orange',
      'Brown',
      'Grey',
      'Blue-Grey',
      'Red'
    ];

    return colors[Math.floor(Math.random() * colors.length)];
  }
}
