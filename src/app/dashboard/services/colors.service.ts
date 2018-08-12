import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorsService {

  colorPreview = 'rgba(0, 0, 0, 1)';
  opacity = 100;
  colors = {};

  constructor() { }

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

  public addColor(colorName: HTMLInputElement, color: HTMLInputElement) {
    this.colors[colorName.value] = color.value;
    colorName.value = '';
    color.value = '#000000';
  }

  public colorChange($event): void {
    this.appllyColor($event.target.value);
  }

  public opacityChange($event, color: HTMLInputElement): void {
    this.appllyColor(color.value, $event.target.value);
  }
}
