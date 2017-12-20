import {name as yourpersPosts} from './post/post';
import {name as yourpersItem} from './item/item';
import {name as yourpersBundle} from './bundle/bundle';
import {name as yourpersOverview} from './overview/overview';
import {name as yourpersTopic} from './topic/topic';	

export default 
angular.module('app.deprecated', [
    
    yourpersPosts,
    yourpersItem,
    yourpersBundle,
    yourpersOverview,
    yourpersTopic,
    
]).name;