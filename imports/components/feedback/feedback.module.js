import FeedbackButton from './feedback-button/feedback-button.module';
import FeedbackDialog from './feedback-dialog/feedback-dialog.module';

export default angular
    .module('Feedback', [
        FeedbackButton,
        FeedbackDialog,
    ])
    .name;