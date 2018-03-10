import moment from 'moment';
import 'moment/locale/nl';

export default class DaySelectorService {

    constructor() {
        'ngInject';
        this.selectedDate = new Date();
        console.log('initial date', this.selectedDate)
        this.selectedDate.setUTCHours(0);
        this.selectedDate.setUTCMinutes(0);
        this.selectedDate.setUTCSeconds(0);
        this.selectedDate.setUTCMilliseconds(0);
        console.log('after setting time', this.selectedDate)
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
        this.maxDate = new Date(this.selectedDate.getTime()+24*60*60*1000).getTime()

        console.log('min', new Date(this.minDate))
        console.log('max', new Date(this.maxDate))
    }

}