export interface IGetLatestDriverLocationResponse {
  status: number;
  message: string;
  data: {
    location: {
      latitude: number;
      longitude: number;
    };
  };
}
