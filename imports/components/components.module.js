import {name as yourpersFeedback} from '/imports/components/feedback/feedback';
import {name as yourpersLoader} from '/imports/components/loader/loader';

export const componentsModule = angular
    .module('app.components', [
       
        yourpersFeedback,
        yourpersLoader,
        
    ]).name;
    