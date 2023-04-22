import { ChangeDetectionStrategy } from '@angular/compiler';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

interface BodyPart {
  id: number;
  name: string;
  selected: boolean;
  price: number;
}

@Component({
  selector: 'app-damage-calculator',
  templateUrl: './damage-calculator.component.html',
  styleUrls: ['./damage-calculator.component.scss'],
})
export class DamageCalculatorComponent {
  totalPrice = 0;

  bodyParts: BodyPart[] = [
    { id: 1, name: 'Kapotas', selected: false, price: 180 },
    { id: 2, name: 'K. Sparnas', selected: false, price: 100 },
    { id: 3, name: 'D. Sparnas', selected: false, price: 100 },
    { id: 4, name: 'Priekinis buferis', selected: false, price: 120 },
    { id: 5, name: 'K. P. Durys', selected: false, price: 170 },
    { id: 6, name: 'D. P. Durys', selected: false, price: 170 },
    { id: 7, name: 'K. P. Žibintas', selected: false, price: 110 },
    { id: 8, name: 'D. P. Žibintas', selected: false, price: 110 },
    { id: 9, name: 'K. G. Durys', selected: false, price: 170 },
    { id: 10, name: 'D. G. Durys', selected: false, price: 170 },
    { id: 11, name: 'K. Arka', selected: false, price: 200 },
    { id: 12, name: 'D. Arka', selected: false, price: 200 },
    { id: 13, name: 'Galinis buferis', selected: false, price: 120 },
    { id: 14, name: 'K. D. Žibintas', selected: false, price: 110 },
    { id: 15, name: 'D. D. Žibintas', selected: false, price: 110 },
    { id: 16, name: 'Padanga', selected: false, price: 220 },
  ];

  constructor(private cdRef: ChangeDetectorRef) {}

  updateTotalPrice() {
    this.totalPrice = this.bodyParts.reduce((total, part) => {
      if (part.selected) {
        return total + part.price;
      } else {
        return total;
      }
    }, 0);

    console.log(this.totalPrice);

    this.cdRef.detectChanges();
  }
}
