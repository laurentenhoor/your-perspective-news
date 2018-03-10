export default class DaySelectorService {

    constructor() {
        'ngInject';
        this.selectedDate = new Date();
    }

    tomorrow() {
        this.selectedDate.setDate(this.selectedDate.getDate()+1)
    }

    yesterday() {
        this.selectedDate.setDate(this.selectedDate.getDate()-1)
    }

}