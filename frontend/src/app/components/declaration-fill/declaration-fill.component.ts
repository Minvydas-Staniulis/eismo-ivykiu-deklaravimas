import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-declaration-fill',
  templateUrl: './declaration-fill.component.html',
  styleUrls: ['./declaration-fill.component.scss'],
})
export class DeclarationFillComponent implements AfterViewInit, OnInit {
  private isDrawing = false;
  private startX!: number;
  private startY!: number;
  private currentX!: number;
  private currentY!: number;

  @ViewChild('canvasElement') canvasElement!: ElementRef<HTMLCanvasElement>;

  isLinear = true;

  start!: FormGroup;
  acceptTerms!: FormGroup;
  firstFormGroup!: FormGroup;
  timeAndPlace!: FormGroup;
  pictureGroup!: FormGroup;
  hitGroup!: FormGroup;
  howGroup!: FormGroup;

  hits = [
    'Priekinis buferis',
    'Sparnas k. pusė',
    'Sparnas d. pusė',
    'Priekinės durys k. pusė',
    'Priekinės durys d. pusė',
    'Galinės durys k. pusė',
    'Galinės durys d. pusė',
    'Arka k. pusė',
    'Arka d. pusė',
    'Galinis buferis',
    'Kita',
  ];

  how = [
    { label: 'stovint / sustabdžius', value: 'stop' },
    { label: 'pradedant važiuoti / atidarant dureles', value: 'stop' },
    { label: 'stabdant', value: 'stop' },
    { label: 'išvažiuojant iš stovėjimo vietos', value: 'stop' },
    { label: 'įvažiuojant į stovėjimo vietą', value: 'stop' },
    { label: 'įvažiuojant į žiedinę sankryžą', value: 'stop' },
    { label: 'važiuojant žiedinėje sankryžoje', value: 'stop' },
    {
      label:
        'atsitrenkiant į ta pačia kryptimi ir ta pačia kelio juosta važiuojančios transporto priemonės galinę dalį',
      value: 'stop',
    },
    {
      label: 'važiuojant ta pačia kryptimi, tačiau kita kelio juosta',
      value: 'stop',
    },
    { label: 'persirikuojant', value: 'stop' },
    { label: 'lenkiant', value: 'stop' },
    { label: 'sukant į dešinę', value: 'stop' },
    { label: 'sukant į kairę', value: 'stop' },
    { label: 'važiuojant atbuline eiga', value: 'stop' },
    { label: 'įvažiuojant į priešpriešinio eismo juostą', value: 'stop' },
    { label: 'sankryžoje atsitrenkiant iš dešinės', value: 'stop' },
    {
      label:
        'nesuteikiant pirmenybės teisės ar nepaisant raudono šviesaforo signalo',
      value: 'stop',
    },
  ];

  lat!: number;
  lng!: number;

  constructor(private renderer: Renderer2, private _formBuilder: FormBuilder) {}

  ngAfterViewInit() {
    const canvas = this.canvasElement.nativeElement;
    const ctx = canvas.getContext('2d');

    this.renderer.listen(canvas, 'mousedown', (event) => {
      this.isDrawing = true;
      this.startX = event.clientX - canvas.offsetLeft;
      this.startY = event.clientY - canvas.offsetTop;
    });

    this.renderer.listen(canvas, 'mousemove', (event) => {
      if (this.isDrawing) {
        this.currentX = event.clientX - canvas.offsetLeft;
        this.currentY = event.clientY - canvas.offsetTop;

        ctx?.beginPath();
        ctx?.moveTo(this.startX, this.startY);
        ctx?.lineTo(this.currentX, this.currentY);
        ctx?.stroke();

        this.startX = this.currentX;
        this.startY = this.currentY;
      }
    });

    this.renderer.listen(canvas, 'mouseup', (event) => {
      this.isDrawing = false;
    });
  }

  ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;

        this.timeAndPlace = this._formBuilder.group({
          time: ['', Validators.required],
          lat: { value: this.lat, disabled: true },
          lng: { value: this.lng, disabled: true },
        });
      });
    } else {
      console.log('Geolocation is not supported by this browser.');
    }

    this.initFormGroups();
  }

  initFormGroups() {
    this.acceptTerms = this._formBuilder.group({
      options: ['', Validators.required],
    });

    this.firstFormGroup = this._formBuilder.group({
      myLicensePlate: [
        'AAA111',
        [Validators.required, Validators.pattern('[A-Z]{3}[0-9]{3}')],
      ],
      otherLicensePlate: [
        'AAA111',
        [Validators.required, Validators.pattern('[A-Z]{3}[0-9]{3}')],
      ],
      myEmail: ['asd@gmail.com', [Validators.required, Validators.email]],
      otherEmail: ['asd@gmail.com', [Validators.required, Validators.email]],
    });

    this.pictureGroup = this._formBuilder.group({
      picture: ['', Validators.required],
    });

    this.hitGroup = this._formBuilder.group({
      myFirstHit: ['', Validators.required],
      otherFirstHit: ['', Validators.required],
    });

    this.howGroup = this._formBuilder.group({
      myHow: this._formBuilder.array([]),
      otherHow: this._formBuilder.array([]),
    });
  }
}
