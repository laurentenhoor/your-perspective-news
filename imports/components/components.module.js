import yourpersFeedback from './feedback/feedback';
import yourpersLoader from './loader/loader.module';

export default
    angular.module('app.components', [

        yourpersFeedback,
        yourpersLoader,

    ]).name;