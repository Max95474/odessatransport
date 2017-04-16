import {Point} from "./point";
export class Segment {
  id: string;
  stoppingId: string;
  routeId: string;
  direction: number;
  position: number;
  built: number;
  points: Array<Point>;
}
