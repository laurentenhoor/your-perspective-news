import FirstUseToast from './first-use-toast/fist-use-toast.module';
import FistUseDialog from './first-use-dialog/first-use-dialog.module';

export default angular
    .module('About', [
        FirstUseToast,
        FistUseDialog,
    ])
    .name;