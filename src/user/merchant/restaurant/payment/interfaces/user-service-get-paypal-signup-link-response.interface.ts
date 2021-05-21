export interface IUserServiceGetPayPalSignUpLinkResponse {
  status: number;
  message: string;
  data: {
    action_url: string;
  };
}
