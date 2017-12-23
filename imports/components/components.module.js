import Feedback from './feedback/feedback';
import Loader from './loader/loader.module';
import Auth from './auth/auth.module'

export default angular
    .module('app.components', [Feedback, Loader, Auth])
    .name;