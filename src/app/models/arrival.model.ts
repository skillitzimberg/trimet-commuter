export class Arrival {
  shortSign: string;
  scheduled: string;
  arrivalMin: number;
  arrivalSec: number;
  late: string;

  constructor(queryTime, params) {
    this.shortSign = params.shortSign || '';
    this.scheduled = '';
    this.arrivalMin = 0;
    this.arrivalSec = 0;
    this.late = 'No ETA';

    if (params.scheduled) {
      const options = { hour: 'numeric', minute: '2-digit' };
      const scheduledDate = new Date(params.scheduled);
      this.scheduled = scheduledDate.toLocaleString('en-US', options);

      if (params.estimated) {
        const msPerMin = 60 * 1000;
        const estimatedTime = new Date(params.estimated).getTime();
        const arrivalTotal = (estimatedTime - queryTime) / msPerMin;
        this.arrivalMin = Math.floor(arrivalTotal);
        this.arrivalSec = 5 * Math.round(12 * (arrivalTotal - this.arrivalMin));
        if (this.arrivalSec === 60) {
          this.arrivalSec = 0;
          this.arrivalMin += 1;
        }

        const scheduledTime = scheduledDate.getTime();
        const lateMin = Math.floor((estimatedTime - scheduledTime) / msPerMin);
        this.late = ((lateMin === 0) ? 'On time' : lateMin + ' min late');
      }
    }
  }
}
