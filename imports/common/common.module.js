import {name as yourpersMenu} from '/imports/common/menu/menu';
import {name as yourpersBulletin} from '/imports/common/bulletin/bulletin';

import desktopViewer from './desktop-viewer/desktop-viewer';

export default 
angular.module('app.common', [
    
    yourpersMenu,
    yourpersBulletin,
    desktopViewer,
    
]).name;