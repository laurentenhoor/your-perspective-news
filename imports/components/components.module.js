import FeedbackButton from './feedback-button/feedback-button.module';
import FeedbackDialog from './feedback-dialog/feedback-dialog.module';
import Loader from './loader/loader.module';
import Auth from './auth/auth.module';
import AccountMenu from './account-menu/account-menu.module';
import ScrollDisabler from './scroll-disabler/scroll-disabler.module';
import Dialog from './dialog/dialog.module';
import SelectSource from './select-source/select-source.module'
import WriteOpinionDialog from './write-opinion-dialog/write-opinion-dialog.module';

export default angular
    .module('app.components', [
        FeedbackButton,
        FeedbackDialog,
        Loader,
        Auth,
        AccountMenu,
        ScrollDisabler,
        Dialog,
        SelectSource,
        WriteOpinionDialog
    ])
    .name;