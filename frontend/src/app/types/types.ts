export interface DeclarationData {
  myLicensePlate: string;
  otherLicensePlate: string;

  myEmail: string;
  otherEmail: string;

  declaration: string;

  picture1: string | null;
  picture2: string | null;
  picture3: string | null;
  picture4: string | null;
  picture5: string | null;
  picture6: string | null;

  myFirstHit: string;
  otherFirstHit: string;

  myHow: string;
  otherHow: string;

  firstDriverName: string;
  firstDriverSurname: string;
  firstDriverBirthDate: string | null;
  firstDriverCountry: string;
  firstDriverStreet: string;
  firstDriverPhoneNumber: string;
  firstDriverIdNumber: number;

  secondDriverName: string;
  secondDriverSurname: string;
  secondDriverBirthDate: string | null;
  secondDriverCountry: string;
  secondDriverStreet: string;
  secondDriverPhoneNumber: string;
  secondDriverIdNumber: number;

  time: string | null;
  lat: string;
  lng: string;
}
