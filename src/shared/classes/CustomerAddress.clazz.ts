import { Customer } from './Customer.clazz';

export class CustomerAddress {
  constructor(
    public id: string,
    public customer,
    public address: string,
    public city: string,
    public area: string,
    public geom: { type: string; coordinates: number[] },
  ) {
    this.customer = {
      id,
    };
  }
}

// export class CustomerAddress {
//   id: string;
//   customer: Customer;
//   address: string;
//   city: string;
//   area: string;
//   geom: { type: string; coordinates: number[] };
// }
