// export class Customer {
//   id: string;
//   phoneNumber: string;
//   password: string;
//   name: string;
//   gender: string;
//   avatar: string;
//   email: string;
//   isPhoneNumberVerified: boolean;
//   verifyPhoneNumberOTP: string;
//   isCustomer: boolean;
// }

export class Customer {
  constructor(
    public id: string,
    public phoneNumber: string,
    public password: string,
    public name: string,
    public gender: string,
    public avatar: string,
    public email: string,
    public isPhoneNumberVerified: boolean,
    public verifyPhoneNumberOTP: string,
    public isCustomer: boolean,
  ) {}
}
