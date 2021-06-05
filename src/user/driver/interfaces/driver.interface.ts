import { IAccountWallet } from './account-wallet.interface';

export interface IDriver {
  id: string;
  phoneNumber?: string;
  password?: string;
  email?: string;
  name?: string;
  city?: string;
  dateOfBirth?: string;
  IDNumber?: string;
  identityCardImageUrl?: string;
  driverLicenseImageUrl?: string;
  vehicleRegistrationCertificateImageUrl?: string;
  wallet?: IAccountWallet;
  isVerified?: boolean;
  isBanned?: boolean;
}
