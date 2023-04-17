export interface DeclarationData {
  myLicensePlate: string;
  otherLicensePlate: string;

  myEmail: string;
  otherEmail: string;

  declaration: File;

  picture1: File;
  picture2: File;
  picture3: File;
  picture4: File;
  picture5: File;
  picture6: File;

  myFirstHit: string;
  otherFirstHit: string;

  myHow: string;
  otherHow: string;

  firstDriverName: string;
  firstDriverSurname: string;
  firstDriverBirthDate: string;
  firstDriverCountry: string;
  firstDriverStreet: string;
  firstDriverPhoneNumber: string;
  firstDriverIdNumber: number;

  secondDriverName: string;
  secondDriverSurname: string;
  secondDriverBirthDate: string;
  secondDriverCountry: string;
  secondDriverStreet: string;
  secondDriverPhoneNumber: string;
  secondDriverIdNumber: number;

  time: string;
  lat: string;
  lng: string;
}
