export default class DaySelectorService {

    constructor($auth) {
        'ngInject';

        this.$auth = $auth;

        this.selectedDate = new Date();
        
        if (new Date().getHours() < 16) {
            console.log('Het is nog geen 16:00, dus nog geen nieuwe onderwerpen!');
            this.yesterday();
        }
        this.today = new Date(this.selectedDate);
        
        this.selectedDate.setUTCHours(0);
        this.selectedDate.setUTCMinutes(0);
        this.selectedDate.setUTCSeconds(0);
        this.selectedDate.setUTCMilliseconds(0);

        this.minDate = null;
        this.maxDate = null;
        this.calculateRange();
    }

    nextDayButtonHidden() {
        if (this.$auth.isAdmin()) {
            return false;
        }
        return this.selectedDate.getMonth() == this.today.getMonth() && this.selectedDate.getDate() == this.today.getDate();
    }

    tomorrow() {
        this.selectedDate.setDate(this.selectedDate.getDate() + 1);
        this.calculateRange();
    }

    yesterday() {
        this.selectedDate.setDate(this.selectedDate.getDate() - 1);
        this.calculateRange();
    }

    calculateRange() {
        this.minDate = this.selectedDate.getTime();
        this.maxDate = new Date(this.selectedDate.getTime() + 24 * 60 * 60 * 1000).getTime();
    }

}