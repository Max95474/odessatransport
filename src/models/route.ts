import {Segment} from "./segment";
import {Transport} from "./transport";
export class Route {
  id: string;
  Number: number;
  Type: string;
  title: string;
  color: string;
  distance: number;
  cost: number;
  last_update: Date;
  segments: Array<Segment>;
  transport: Array<Transport>;
}
