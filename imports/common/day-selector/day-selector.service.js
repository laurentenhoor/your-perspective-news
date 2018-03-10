export default class DaySelectorService {

    constructor() {
        'ngInject';
        this.selectedDate = new Date();

        this.selectedDate.setUTCHours(0);
        this.selectedDate.setUTCMinutes(0);
        this.selectedDate.setUTCSeconds(0);
        this.selectedDate.setUTCMilliseconds(0);

        this.minDate = null;
        this.maxDate = null;
        this.calculateRange();
    }

    tomorrow() {
        this.selectedDate.setDate(this.selectedDate.getDate()+1);
        this.calculateRange();
    }

    yesterday() {
        this.selectedDate.setDate(this.selectedDate.getDate()-1);
        this.calculateRange();
    }

    calculateRange() {
        this.minDate = this.selectedDate.getTime();
        this.maxDate = new Date(this.selectedDate.getTime()+24*60*60*1000).getTime();
    }

}