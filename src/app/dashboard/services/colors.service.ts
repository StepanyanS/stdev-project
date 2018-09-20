import { Injectable } from '@angular/core';

import { Color } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ColorsService {

  colorPreview = '#000000';
  opacity = 100;
  colors: Color[] = [];

  constructor() {
    // this.colors = [
    //   {
    //     name: 'red',
    //     value: '#ff0000'
    //   },
    //   {
    //     name: 'green',
    //     value: '#00ff00'
    //   },
    //   {
    //     name: 'black',
    //     value: '#000000'
    //   }
    // ];
   }

  private appllyColor(hex: string): void {
    document.documentElement.style.setProperty('--color-background', `#${hex}`);
  }

  public addColor(name: HTMLInputElement, value: HTMLInputElement) {
    const color = new Color(name.value, `#${value.value}`);
    if (this.colors.length === 0) {
      document.documentElement.style.setProperty('--btn-background-color', color.value);
    }
    this.colors.push(color);
    name.value = '';
    value.value = '';
    this.appllyColor('000000');
  }

  removeColor(index: number) {
    this.colors.splice(index, 1);
  }

  public colorChange($event): void {
    if($event.target.value.length === 6) {
      this.appllyColor($event.target.value);
    }
  }
}
