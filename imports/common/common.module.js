import {name as yourpersMenu} from '/imports/common/menu/menu';
import {name as yourpersBulletin} from '/imports/common/bulletin/bulletin';

import desktopViewer from './desktop-viewer/desktop-viewer';

// Deprecated
import {name as yourpersPosts} from '/imports/common/deprecated/post/post';
import {name as yourpersItem} from '/imports/common/deprecated/item/item';
import {name as yourpersBundle} from '/imports/common/deprecated/bundle/bundle';
import {name as yourpersOverview} from '/imports/common/deprecated/overview/overview';
import {name as yourpersTopic} from '/imports/common/deprecated/topic/topic';	

export default 
angular.module('app.common', [
    
    yourpersMenu,
    yourpersBulletin,
    desktopViewer,
    
    // Deprecated
    yourpersPosts,
    yourpersItem,
    yourpersBundle,
    yourpersOverview,
    yourpersTopic,
    
]).name;