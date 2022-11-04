import { TaxiStop } from "./taxi-stop";

export interface TaxiRoute {
  origin: TaxiStop;
  destination: TaxiStop;
  notes: string;
  std_price: number;
  mode: number;
}
