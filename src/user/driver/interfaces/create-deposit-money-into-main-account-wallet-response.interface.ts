export interface ICreateDepositMoneyIntoMainAccountWalletResponse {
  status: number;
  message: string;
  paypalOrderId?: string | null;
}
