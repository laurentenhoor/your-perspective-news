import FeedbackButton from './feedback-button/feedback-button.module';
import FeedbackDialog from './feedback-dialog/feedback-dialog.module';
import Loader from './loader/loader.module';
import Auth from './auth/auth.module';
import AccountMenu from './account-menu/account-menu.module';

export default angular
    .module('app.components', [
        FeedbackButton,
        FeedbackDialog,
        Loader,
        Auth,
        AccountMenu,
    ])
    .name;