// import native modules
import { Injectable } from '@angular/core';

// import models
import { Color } from '../models/color.model';

@Injectable({
  providedIn: 'root'
})
export class ColorsService {

  colorPreview = 'rgba(0, 0, 0, 1)';
  opacity = 100;
  colors: Color[] = [];

  constructor() {
    this.colors = [
      {
        name: 'red',
        value: '#ff0000'
      },
      {
        name: 'green',
        value: '#00ff00'
      },
      {
        name: 'black',
        value: '#000000'
      }
    ];
   }

  private hex2RGBA(hex: string, opacity: number = 100): string {
    hex = hex.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r},${g}, ${b}, ${opacity / 100})`;
  }

  private appllyColor(hex: string, opacity: number = 100): void {
    this.colorPreview = this.hex2RGBA(hex, opacity);
    document.documentElement.style.setProperty('--color-background', this.colorPreview);
  }

  public addColor(name: HTMLInputElement, value: HTMLInputElement) {
    const color = new Color(name.value, value.value);
    if (this.colors.length === 0) {
      document.documentElement.style.setProperty('--btn-background-color', color.value);
    }
    this.colors.push(color);
    name.value = '';
    value.value = '#000000';
    this.appllyColor(value.value);
  }

  removeColor(index: number) {
    console.log(index);
    this.colors.splice(index, 1);
    console.log(this.colors);
  }

  public colorChange($event): void {
    this.appllyColor($event.target.value);
  }

  public opacityChange($event, color: HTMLInputElement): void {
    this.appllyColor(color.value, $event.target.value);
  }
}
