import Feedback from './feedback/feedback.module';
import FeedbackDialog from './feedback-dialog/feedback-dialog.module';
import Loader from './loader/loader.module';
import Auth from './auth/auth.module'

export default angular
    .module('app.components', [
        Feedback,
        FeedbackDialog,
        Loader,
        Auth
    ])
    .name;