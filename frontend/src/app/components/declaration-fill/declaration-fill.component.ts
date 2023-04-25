import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
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
import { DeclarationData } from 'src/app/types/types';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

type TDocumentDefinitions = {
  content: any[]; // replace `any` with your actual content type
  pageSize?: any; // replace `any` with your actual page size type
  pageOrientation?: 'portrait' | 'landscape';
  pageMargins?: number | number[];
  defaultStyle?: any; // replace `any` with your actual default style type
};

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

  picture1Base64!: string;
  picture2Base64!: string;
  picture3Base64!: string;
  picture5Base64!: string;
  picture6Base64!: string;

  pictureArray: any[] = [];

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
  radioGroup!: FormGroup;

  declarationImage!: string;

  width = 160;
  height = 80;

  data!: DeclarationData;

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
  userInfo: any;

  selectedKaltininkas!: string;
  kaltininkasLicensePlate!: string;

  get myHowControl() {
    return this.howGroup.get('myHow') as FormArray;
  }

  get otherHowControl() {
    return this.howGroup.get('otherHow') as FormArray;
  }

  get myLicensePlateControl() {
    return this.firstFormGroup.get('myLicensePlate');
  }

  get otherLicensePlateControl() {
    return this.firstFormGroup.get('otherLicensePlate');
  }

  constructor(
    private renderer: Renderer2,
    private _formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private http: HttpClient
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

  clearCanvas() {
    const canvas = this.canvasElement.nativeElement;
    const ctx = canvas.getContext('2d');

    ctx?.clearRect(0, 0, canvas.width, canvas.height);
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

    const userInfoString = localStorage.getItem('user');
    if (userInfoString) {
      this.userInfo = JSON.parse(userInfoString);

      this.firstFormGroup.controls['myEmail'].setValue(this.userInfo.email);
      this.driverData
        .get('firstDriver.name')
        ?.patchValue(this.userInfo.first_name);
      this.driverData
        .get('firstDriver.surname')
        ?.patchValue(this.userInfo.last_name);
    }

    console.log(this.userInfo);
  }

  initFormGroups() {
    this.acceptTerms = this._formBuilder.group({
      options: ['', Validators.required],
    });

    this.firstFormGroup = this._formBuilder.group({
      myLicensePlate: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*[0-9]|EV[0-9]{4})[A-Z0-9]{1,6}$/),
        ],
      ],
      otherLicensePlate: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*[0-9]|EV[0-9]{4})[A-Z0-9]{1,6}$/),
        ],
      ],
      myEmail: ['', [Validators.required, Validators.email]],
      otherEmail: ['', [Validators.required, Validators.email]],
    });

    this.pictureGroup = this._formBuilder.group({
      picture1: ['', Validators.required],
      picture2: ['', Validators.required],
      picture3: ['', Validators.required],
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
        country: ['aaa', Validators.required],
        street: ['aaa', Validators.required],
        phoneNumber: ['+370', Validators.pattern(/^\+3706\d{7}$/)],
        idNumber: ['123456', Validators.pattern(/^\d{6}$/)],
      }),
      secondDriver: this._formBuilder.group({
        name: ['vardas', Validators.required],
        surname: ['pavard', Validators.required],
        birthDate: ['', Validators.required],
        country: ['aaa', Validators.required],
        street: ['aaa', Validators.required],
        phoneNumber: ['+370', Validators.pattern(/^\+3706\d{7}$/)],
        idNumber: ['123456', Validators.pattern(/^\d{6}$/)],
      }),
    });

    this.radioGroup = this._formBuilder.group({
      kaltininkas: '',
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
    if (this.radioGroup.get('kaltininkas')?.value == 'Kaltininkas1') {
      this.kaltininkasLicensePlate =
        this.firstFormGroup.get('myLicensePlate')?.value;
    } else {
      this.kaltininkasLicensePlate =
        this.firstFormGroup.get('otherLicensePlate')?.value;
    }

    this.data = {
      myLicensePlate: this.firstFormGroup.get('myLicensePlate')?.value,
      otherLicensePlate: this.firstFormGroup.get('otherLicensePlate')?.value,

      myEmail: this.firstFormGroup.get('myEmail')?.value,
      otherEmail: this.firstFormGroup.get('otherEmail')?.value,

      declaration: this.declarationImage,

      picture1: this.picture1Base64,
      picture2: this.picture2Base64,
      picture3: this.picture3Base64,
      picture5: this.picture5Base64,
      picture6: this.picture6Base64,

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

    this.createPd();
  }

  onFileSelected1(event: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.picture1Base64 = reader.result as string;
      };
    }
  }

  onFileSelected2(event: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.picture2Base64 = reader.result as string;
      };
    }
  }

  onFileSelected3(event: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.picture3Base64 = reader.result as string;
      };
    }
  }

  onFileSelected5(event: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.picture5Base64 = reader.result as string;
      };
    }
  }

  onFileSelected6(event: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.picture6Base64 = reader.result as string;
      };
    }
  }

  onInput(event: any) {
    event.target.value = event.target.value.toUpperCase();
  }

  createPd() {
    // playground requires you to assign document definition to a variable called dd

    const dd = {
      content: [
        {
          columns: [
            [
              {
                text: 'Eismo įvykio deklaracija',
                color: '#333333',
                width: '*',
                fontSize: 24,
                bold: true,
                alignment: 'center',
                margin: [0, 0, 0, 15],
              },
              {
                stack: [
                  {
                    columns: [
                      {
                        text: 'Laikas \n Plokštuma \n Ilguma \n Kaltininkas',
                        color: '#aaaaab',
                        bold: true,
                        width: '*',
                        fontSize: 12,
                        alignment: 'right',
                      },
                      {
                        text: `${this.data.time} \n ${this.data.lat} \n ${this.data.lng} \n ${this.kaltininkasLicensePlate}`,
                        bold: true,
                        color: '#333333',
                        fontSize: 12,
                        alignment: 'right',
                        width: 100,
                      },
                    ],
                  },
                ],
              },
            ],
          ],
        },
        {
          columns: [
            {
              text: 'Pirmasis vairuotojas',
              color: '#aaaaab',
              bold: true,
              fontSize: 14,
              alignment: 'left',
              margin: [0, 20, 0, 5],
            },
            {
              text: 'Antrasis vairuotojas',
              color: '#aaaaab',
              bold: true,
              fontSize: 14,
              alignment: 'left',
              margin: [0, 20, 0, 5],
            },
          ],
        },
        {
          columns: [
            {
              text: `${this.data.firstDriverName} \n ${this.data.firstDriverSurname} \n ${this.data.firstDriverBirthDate} \n  \n ${this.data.firstDriverIdNumber} \n ${this.data.myLicensePlate}`,
              bold: true,
              color: '#333333',
              alignment: 'left',
            },
            {
              text: `${this.data.secondDriverName} \n ${this.data.secondDriverSurname} \n ${this.data.secondDriverBirthDate} \n  \n ${this.data.secondDriverIdNumber} \n ${this.data.otherLicensePlate}`,
              bold: true,
              color: '#333333',
              alignment: 'left',
            },
          ],
        },
        {
          columns: [
            {
              text: 'Kontaktai',
              color: '#aaaaab',
              bold: true,
              margin: [0, 7, 0, 3],
            },
            {
              text: 'Kontaktai',
              color: '#aaaaab',
              bold: true,
              margin: [0, 7, 0, 3],
            },
          ],
        },
        {
          columns: [
            {
              text: `${this.data.firstDriverPhoneNumber} \n ${this.data.myEmail}`,
              style: 'invoiceBillingAddress',
            },
            {
              text: `${this.data.secondDriverPhoneNumber} \n ${this.data.otherEmail}`,
              style: 'invoiceBillingAddress',
            },
          ],
        },
        {
          columns: [
            {
              text: 'Adresas',
              color: '#aaaaab',
              bold: true,
              margin: [0, 7, 0, 3],
            },
            {
              text: 'Adresas',
              color: '#aaaaab',
              bold: true,
              margin: [0, 7, 0, 3],
            },
          ],
        },
        {
          columns: [
            {
              text: `${this.data.firstDriverStreet} \n ${this.data.firstDriverCountry}`,
              style: 'invoiceBillingAddress',
            },
            {
              text: `${this.data.secondDriverStreet} \n ${this.data.secondDriverCountry}`,
              style: 'invoiceBillingAddress',
            },
          ],
        },
        '\n\n',
        {
          text: 'Duomenys',
          color: '#333333',
          width: '*',
          fontSize: 15,
          bold: true,
          alignment: 'center',
          margin: [0, 0, 0, 15],
        },
        {
          columns: [
            {
              text: 'Pirmojo vairuotojo aplinkybės',
              color: '#aaaaab',
              bold: true,
              fontSize: 14,
              alignment: 'left',
              margin: [0, 20, 0, 5],
            },
            {
              text: 'Antrojo vairuotojo aplinkybės',
              color: '#aaaaab',
              bold: true,
              fontSize: 14,
              alignment: 'left',
              margin: [0, 20, 0, 5],
            },
          ],
        },
        {
          columns: [
            {
              text: `Pirminis smūgis: ${this.data.myFirstHit} \n Įvykio dėtalės: ${this.data.myHow} \n`,
              bold: true,
              color: '#333333',
              alignment: 'left',
            },
            {
              text: `Pirminis smūgis: ${this.data.otherFirstHit} \n Įvykio dėtalės: ${this.data.otherHow} \n`,
              bold: true,
              color: '#333333',
              alignment: 'left',
            },
          ],
        },
        '\n\n\n\n',
        {
          image: this.declarationImage,
          width: 500,
          alignment: 'center',
        },
        {
          image: this.picture1Base64,
          width: 500,
          alignment: 'center',
        },
        {
          image: this.picture2Base64,
          width: 500,
          alignment: 'center',
        },
        {
          image: this.picture3Base64,
          width: 500,
          alignment: 'center',
        },
        {
          image: this.picture5Base64,
          width: 500,
          alignment: 'center',
        },
        {
          image: this.picture6Base64,
          width: 500,
          alignment: 'center',
        },
      ],
      styles: {
        notesTitle: {
          fontSize: 10,
          bold: true,
          margin: [0, 50, 0, 3],
        },
        notesText: {
          fontSize: 10,
        },
      },
      defaultStyle: {
        columnGap: 20,
        //font: 'Quicksand',
      },
    };
    const pdfMake = require('pdfmake/build/pdfmake.js');

    pdfMake.createPdf(dd).download('test.pdf');
  }
}
