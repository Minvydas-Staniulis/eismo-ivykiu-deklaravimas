import { DatePipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSelectChange } from '@angular/material/select';

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
  driverData!: FormGroup;

  declarationImage!: string;

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

  hows = [
    { label: 'stovint / sustabdžius', value: 'stop', checked: false },
    {
      label: 'pradedant važiuoti / atidarant dureles',
      value: 'stop',
      checked: false,
    },
    { label: 'stabdant', value: 'stop', checked: false },
    {
      label: 'išvažiuojant iš stovėjimo vietos',
      value: 'stop',
      checked: false,
    },
    { label: 'įvažiuojant į stovėjimo vietą', value: 'stop', checked: false },
    { label: 'įvažiuojant į žiedinę sankryžą', value: 'stop', checked: false },
    { label: 'važiuojant žiedinėje sankryžoje', value: 'stop', checked: false },
    {
      label:
        'atsitrenkiant į ta pačia kryptimi ir ta pačia kelio juosta važiuojančios transporto priemonės galinę dalį',
      value: 'stop',
      checked: false,
    },
    {
      label: 'važiuojant ta pačia kryptimi, tačiau kita kelio juosta',
      value: 'stop',
      checked: false,
    },
    { label: 'persirikuojant', value: 'stop', checked: false },
    { label: 'lenkiant', value: 'stop', checked: false },
    { label: 'sukant į dešinę', value: 'stop', checked: false },
    { label: 'sukant į kairę', value: 'stop', checked: false },
    { label: 'važiuojant atbuline eiga', value: 'stop', checked: false },
    {
      label: 'įvažiuojant į priešpriešinio eismo juostą',
      value: 'stop',
      checked: false,
    },
    {
      label: 'sankryžoje atsitrenkiant iš dešinės',
      value: 'stop',
      checked: false,
    },
    {
      label:
        'nesuteikiant pirmenybės teisės ar nepaisant raudono šviesaforo signalo',
      value: 'stop',
      checked: false,
    },
  ];

  lat!: number;
  lng!: number;

  get myHowControl() {
    return this.howGroup.get('myHow') as FormArray;
  }

  get otherHowControl() {
    return this.howGroup.get('otherHow') as FormArray;
  }

  constructor(
    private renderer: Renderer2,
    private _formBuilder: FormBuilder,
    private datePipe: DatePipe
  ) {}

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

      this.declarationImage = canvas.toDataURL('image/png');
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
      picture1: ['', Validators.required],
      picture2: ['', Validators.required],
      picture3: ['', Validators.required],
      picture4: ['', Validators.required],
      picture5: ['', Validators.required],
      picture6: ['', Validators.required],
    });

    this.hitGroup = this._formBuilder.group({
      myFirstHit: ['', Validators.required],
      otherFirstHit: ['', Validators.required],
    });

    this.howGroup = this._formBuilder.group({
      myHow: this._formBuilder.array([]),
      otherHow: this._formBuilder.array([]),
    });

    this.driverData = this._formBuilder.group({
      firstDriver: this._formBuilder.group({
        name: ['', Validators.required],
        surname: ['', Validators.required],
        birthDate: ['', Validators.required],
        country: ['', Validators.required],
        street: ['', Validators.required],
        phoneNumber: ['+370', Validators.pattern(/^\+3706\d{7}$/)],
        idNumber: ['', Validators.pattern(/^\d{6}$/)],
      }),
      secondDriver: this._formBuilder.group({
        name: ['', Validators.required],
        surname: ['', Validators.required],
        birthDate: ['', Validators.required],
        country: ['', Validators.required],
        street: ['', Validators.required],
        phoneNumber: ['+370', Validators.pattern(/^\+3706\d{7}$/)],
        idNumber: ['', Validators.pattern(/^\d{6}$/)],
      }),
    });
  }

  onMyHowChange(event: MatCheckboxChange, value: string) {
    if (event.checked) {
      this.myHowControl.push(new FormControl(value));
    } else {
      const index = this.myHowControl.controls.findIndex(
        (x) => x.value === value
      );
      if (index !== -1) {
        this.myHowControl.removeAt(index);
      }
    }
  }

  onOtherHowChange(event: MatCheckboxChange, value: string) {
    if (event.checked) {
      this.otherHowControl.push(new FormControl(value));
    } else {
      const index = this.otherHowControl.controls.findIndex(
        (x) => x.value === value
      );
      if (index !== -1) {
        this.otherHowControl.removeAt(index);
      }
    }
  }

  sendData() {
    const data = {
      myLicensePlate: this.firstFormGroup.get('myLicensePlate')?.value,
      otherLicensePlate: this.firstFormGroup.get('otherLicensePlate')?.value,

      myEmail: this.firstFormGroup.get('myEmail')?.value,
      otherEmail: this.firstFormGroup.get('otherEmail')?.value,

      declaration: this.declarationImage,

      picture1: this.pictureGroup.get('picture1')?.value,
      picture2: this.pictureGroup.get('picture2')?.value,
      picture3: this.pictureGroup.get('picture3')?.value,
      picture4: this.pictureGroup.get('picture4')?.value,
      picture5: this.pictureGroup.get('picture5')?.value,
      picture6: this.pictureGroup.get('picture6')?.value,

      myFirstHit: this.hitGroup.get('myFirstHit')?.value,
      otherFirstHit: this.hitGroup.get('otherFirstHit')?.value,

      myHow: this.howGroup.get('myHow')?.value,
      otherHow: this.howGroup.get('otherHow')?.value,

      firstDriverName: this.driverData.get('firstDriver.name')?.value,
      firstDriverSurname: this.driverData.get('firstDriver.surname')?.value,
      firstDriverBirthDate: this.datePipe.transform(
        this.driverData.get('firstDriver.birthDate')?.value,
        'yyyy-MM-dd'
      ),
      firstDriverCountry: this.driverData.get('firstDriver.country')?.value,
      firstDriverStreet: this.driverData.get('firstDriver.street')?.value,
      firstDriverPhoneNumber: this.driverData.get('firstDriver.phoneNumber')
        ?.value,
      firstDriverIdNumber: this.driverData.get('firstDriver.idNumber')?.value,

      secondDriverName: this.driverData.get('secondDriver.name')?.value,
      secondDriverSurname: this.driverData.get('secondDriver.surname')?.value,
      secondDriverBirthDate: this.datePipe.transform(
        this.driverData.get('secondDriver.birthDate')?.value,
        'yyyy-MM-dd'
      ),
      secondDriverCountry: this.driverData.get('secondDriver.country')?.value,
      secondDriverStreet: this.driverData.get('secondDriver.street')?.value,
      secondDriverPhoneNumber: this.driverData.get('secondDriver.phoneNumber')
        ?.value,
      secondDriverIdNumber: this.driverData.get('secondDriver.idNumber')?.value,

      time: this.timeAndPlace.get('time')?.value,
      lat: this.timeAndPlace.get('lat')?.value,
      lng: this.timeAndPlace.get('lng')?.value,
    };

    console.log(data);
  }

  //   const formData = new FormData();

  // // Add the picture files to the form data
  // formData.append('picture1', this.pictureGroup.get('picture1').value);
  // formData.append('picture2', this.pictureGroup.get('picture2').value);
  // formData.append('picture3', this.pictureGroup.get('picture3').value);
  // formData.append('picture4', this.pictureGroup.get('picture4').value);
  // formData.append('picture5', this.pictureGroup.get('picture5').value);
  // formData.append('picture6', this.pictureGroup.get('picture6').value);

  // // Add the other form data fields to the form data
  // formData.append('myLicensePlate', this.firstFormGroup.get('myLicensePlate').value);
  // formData.append('otherLicensePlate', this.firstFormGroup.get('otherLicensePlate').value);
  // formData.append('myEmail', this.firstFormGroup.get('myEmail').value);
  // formData.append('otherEmail', this.firstFormGroup.get('otherEmail').value);

  // // Make a POST request to the Django backend
  // this.http.post('http://your-django-backend-url/declaration_create/', formData).subscribe(response => {
  //   console.log(response);
  // });
}
