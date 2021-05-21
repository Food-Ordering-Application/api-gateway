import { PayPalOnboardStatus } from '../enums/paypal-onboard-status.enum';

export interface IUserServiceGetPayPalOnboardStatusResponse {
  status: number;
  message: string;
  data: {
    isOnboard: boolean;
    message: PayPalOnboardStatus;
  };
}
