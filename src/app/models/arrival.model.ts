export class Arrival {
  line: string;
  dest: string;
  scheduled: string;
  arrivalMin: number;
  arrivalSec: number;
  late: string;
  type: string;

  constructor(queryTime, params) {
    const shortSign = params.shortSign || '';
    [this.line, this.dest] = this.splitShortSign(shortSign);
    this.scheduled = '';
    this.arrivalMin = 0;
    this.arrivalSec = 0;
    this.late = 'No ETA';
    this.type = (parseInt(this.line) ? 'bus' : 'max');

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

  splitShortSign(shortSign) {
    const regexTo = / to /i;
    const regexLineTo = / line to /i;
    const regexOtherCases = /^\d+ +/i;
    if (regexLineTo.test(shortSign)) {
      return shortSign.split(regexLineTo);
    } else if (regexTo.test(shortSign)) {
      return shortSign.split(regexTo);
    } else if (regexOtherCases.test(shortSign)) {
      const number = shortSign.match(regexOtherCases)[0].trim();
      const destination = shortSign.replace(regexOtherCases, '');
      return [ number, destination ];
    }
  }
}
