import { Arrival } from  './arrival.model';

export class Stop {
  stopId: number;
  name: string;
  direction: string;
  arrivals: Arrival[];

  constructor( arrivals: Arrival[], params) {
    this.arrivals = arrivals;
    this.stopId = params.locid;
    this.name = params.desc;
    this.direction = params.dir;
  }
}
