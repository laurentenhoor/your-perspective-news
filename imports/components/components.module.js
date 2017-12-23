import yourpersFeedback from './feedback/feedback';
import yourpersLoader from './loader/loader.module';
import Auth from './auth/auth.module'

export default
    angular.module('app.components', [

        yourpersFeedback,
        yourpersLoader,
        Auth

    ]).name;