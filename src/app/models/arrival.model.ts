export class Arrival {
  shortSign: string;
  scheduled: string;
  arrival: string;
  late: string;

  constructor(queryTime, params) {
    this.shortSign = params.shortSign || '';
    this.scheduled = '';
    this.arrival = '';
    this.late = 'No ETA';

    if (params.scheduled) {
      const options = { hour: 'numeric', minute: '2-digit' };
      const scheduledDate = new Date(params.scheduled);
      this.scheduled = scheduledDate.toLocaleString('en-US', options);

      if (params.estimated) {
        const msPerMin = 60 * 1000;
        const estimatedTime = new Date(params.estimated).getTime();
        const arrivalTotal = (estimatedTime - queryTime) / msPerMin;
        let arrivalMin = Math.floor(arrivalTotal);
        let arrivalSec = 5 * Math.round(12 * (arrivalTotal - arrivalMin));
        if (arrivalSec === 60) {
          arrivalSec = 0;
          arrivalMin += 1;
        }
        this.arrival = arrivalMin + ' min ' + arrivalSec + ' sec';

        const scheduledTime = scheduledDate.getTime();
        const lateMin = Math.floor((estimatedTime - scheduledTime) / msPerMin);
        this.late = ((lateMin === 0) ? 'On time' : lateMin + ' min late');
      }
    }
  }
}
