export interface IActorInformationForOrderData {
  name: string;
  phoneNumber: string;
  address: string;
  geom: { type: string; coordinates: number[] };
}
